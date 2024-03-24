import { Request, Response } from 'express';
import { google } from 'googleapis';
import { StatusCodes } from 'http-status-codes';
import { oAuth2Client } from '../config/oauth-client.config';
import { TSubscription } from '../models';
import { User } from '../schemas';
import { client, responseError, responseSuccess } from '../utils';

const SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/spreadsheets.readonly',
];

export const addSubscription = async (req: Request, res: Response) => {
    try {
        const authUrl = oAuth2Client.auth.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        res.status(StatusCodes.OK).json(
            responseSuccess('Successfully get auth url', {
                authUrl,
            }),
        );
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal server error', error));
    }
};

export const addSubscriptionCallback = async (req: Request, res: Response) => {
    try {
        if (req.query.code) {
            const code = req.query.code;

            if (typeof code !== 'string') {
                res.redirect(`${client.CLIENT_SUBSCRIPTIONS_ROUTE}?success=false`);

                return;
            }

            const { tokens } = await oAuth2Client.auth.getToken(code);

            oAuth2Client.auth.setCredentials(tokens);

            const oauth2 = google.oauth2({
                auth: oAuth2Client.auth,
                version: 'v2',
            });

            const subscribedUserInfo = await oauth2.userinfo.get();

            res.redirect(
                `${client.CLIENT_SUBSCRIPTIONS_ROUTE}?success=true&uid=${subscribedUserInfo.data.id}&email=${subscribedUserInfo.data.email}&accessToken=${tokens.access_token}&refreshToken=${tokens.refresh_token}&scope=${tokens.scope}&idToken=${tokens.id_token}&tokenType=${tokens.token_type}&expiryDate=${tokens.expiry_date}`,
            );
        }
    } catch (error) {
        res.redirect(`${client.CLIENT_SUBSCRIPTIONS_ROUTE}?success=false`);
    }
};

// Fetch all subscriptions data
export const fetchAllSubscriptions = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const userId = user?.['_id'];

        const userById = await User.findById({ _id: userId });

        if (!userById) {
            return res.status(StatusCodes.UNAUTHORIZED).json(responseError('User not available'));
        }

        const subscriptions = userById.subscriptions;

        console.log(subscriptions);

        if (!req.query.uid) {
            return res.status(StatusCodes.UNAUTHORIZED).json(responseError('User not available'));
        }

        const subscriptionByUID = subscriptions.filter((sub) => sub.uid === req.query.uid);

        res.status(StatusCodes.OK).json(
            responseSuccess('Successfully fetch subscriptions', {
                subscriptions: subscriptionByUID,
            }),
        );
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal server error', error));
    }
};

// update subscription data
export const updateSubscription = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const userId = user?.['_id'];

        const { uid, email, accessToken, refreshToken, scope, idToken, tokenType, expiryDate } = req.body;

        const userById = await User.findById({ _id: userId });

        if (!userById) {
            return res.status(StatusCodes.UNAUTHORIZED).json(responseSuccess('User not available'));
        }

        const subscriptions = userById.subscriptions;

        // check if already subscribed
        const isSubscribed = subscriptions.filter((sub) => sub.uid === uid).length > 0;

        if (isSubscribed) {
            return res.status(StatusCodes.BAD_REQUEST).json(responseError('Already subscribed'));
        }

        const subscriptionData = {
            uid,
            email,
            accessToken,
            refreshToken,
            scope,
            idToken,
            tokenType,
            expiryDate: Number(expiryDate),
        } as TSubscription;

        userById.subscriptions = [...subscriptions, subscriptionData];

        await userById.save();

        res.status(StatusCodes.OK).json(responseSuccess('Successfully updated'));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal server error'));
    }
};

export const removeSubscription = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const userId = user?.['_id'];

        const userById = await User.findById({ _id: userId });

        if (!userById) {
            return res.status(StatusCodes.UNAUTHORIZED).json(responseSuccess('User not available'));
        }

        const subUid = req.params.subUid;

        userById.subscribedSheets = userById.subscribedSheets.filter((sheet) => sheet.uid !== subUid);

        userById.subscriptions = userById.subscriptions.filter((sub) => sub.uid !== subUid);

        await userById.save();

        return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError('Internal server error'));
    }
};
