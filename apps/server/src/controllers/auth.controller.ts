import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { TUser } from '../models';
import { User } from '../schemas';
import { responseError, responseSuccess } from '../utils';

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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal server error', error));
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

        // success
        const userInfo: Partial<TUser> = {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
        };

        const data = {
            token: user.generateJwt(),
            user: userInfo,
        };

        return res.status(StatusCodes.OK).json(responseSuccess('User successfully logged in', data));
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal server error', error));
    }
};
