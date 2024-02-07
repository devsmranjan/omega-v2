import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { verify } from 'jsonwebtoken';
import { TJwtPayload } from '../config';
import { TUser } from '../models';
import { User } from '../schemas';
import { getSlimUser, responseError, responseSuccess } from '../utils';

export const signUp = async (req: Request, res: Response) => {
    try {
        const body: Partial<TUser> = req.body;
        const { email, username } = body;

        // check if email already exists
        const userByEmail = await User.findOne({ email });

        if (userByEmail) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(responseError('Email id already exist'));
        }

        // check if username already exists
        const userByUsername = await User.findOne({ username });

        if (userByUsername) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(responseError('Username already exist'));
        }

        // create new user
        const newUser = await new User(body).save();

        const data = {
            ...newUser.toObject(),
        };

        delete data.password;

        return res
            .status(StatusCodes.CREATED)
            .json(responseSuccess('User successfully created. Check your email for verification', data));
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal server error', error.data));
    }
};

export const signIn = async (req: Request, res: Response) => {
    try {
        const body: Partial<TUser> = req.body;
        const { username, password } = body;

        // check account is exist or not
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(responseError('Invalid credentials'));
        }

        // validate password
        if (!user.comparePassword(password)) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(responseError('Invalid credentials'));
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // save refresh token
        await user.updateOne({ refreshToken });

        // success
        const data = {
            token: accessToken,
            user: getSlimUser(user),
        };

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1d
            sameSite: 'strict',
            secure: true,
        });

        return res.status(StatusCodes.OK).json(responseSuccess('User successfully logged in', data));
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal server error', error.data));
    }
};

export const getAccessTokenByRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(StatusCodes.UNAUTHORIZED).json(responseError('Unauthorized Access - No Token Provided!'));
    }

    const refreshToken = cookies.jwt;

    console.log('current refresh token', refreshToken);

    const userByRefreshToken = await User.findOne({ refreshToken });

    if (!userByRefreshToken) {
        console.log('No user found with this refresh token');

        return res.status(StatusCodes.FORBIDDEN).json(responseError('Forbidden'));
    }

    // evaluate jwt
    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: unknown, decoded: TJwtPayload) => {
        if (err || userByRefreshToken.id !== decoded.sub) {
            return res.status(StatusCodes.FORBIDDEN).json(responseError('Forbidden'));
        }

        const accessToken = userByRefreshToken.generateAccessToken();

        console.log({ accessToken });

        res.status(StatusCodes.OK).json(
            responseSuccess('Generated new access token successfully.', { token: accessToken }),
        );
    });
};

export const signOut = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(StatusCodes.NO_CONTENT);
    }

    const refreshToken = cookies.jwt;

    console.log('current refresh token', refreshToken);

    const userByRefreshToken = await User.findOne({ refreshToken });

    if (userByRefreshToken) {
        console.log('user found with this refresh token');

        // delete refresh token in db
        userByRefreshToken.updateOne({ refreshToken: null });
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true });

    // use Clear-Site-Data
    res.setHeader('Clear-Site-Data', '"cache", "cookies", "storage", "executionContexts"');

    return res.sendStatus(StatusCodes.NO_CONTENT);
};
