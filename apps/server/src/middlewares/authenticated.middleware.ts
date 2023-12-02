import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticate } from 'passport';

import { IHttpResponse, IUser } from '../models';

export const authenticated = function (req: Request, res: Response, next: NextFunction) {
    authenticate('jwt', function (err: Error, user: IUser) {
        if (err) {
            return next(err);
        }

        if (!user) {
            const response: IHttpResponse = {
                success: false,
                message: 'Unauthorized Access - No Token Provided!',
            };

            return res.status(StatusCodes.UNAUTHORIZED).json(response);
        }

        // add to request
        req.user = {
            _id: user._id,
        };

        next();
    })(req, res, next);
};
