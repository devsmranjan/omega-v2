import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../schemas';
import { getSlimUser, responseError, responseSuccess } from '../utils';

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const userId = user?.['_id'];

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json(responseError('User not found'));
        }

        const userById = await User.findById(userId);

        if (!userById) {
            return res.status(StatusCodes.BAD_REQUEST).json(responseError('User not found'));
        }

        const userInfo = getSlimUser(userById);

        res.status(StatusCodes.OK).json(responseSuccess('User found successfully', userInfo));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError(error));
    }
};
