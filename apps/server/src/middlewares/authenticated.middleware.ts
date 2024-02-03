import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

import { THttpResponse, TUser } from '../models';

export const authenticated = function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function (err: Error, user: TUser) {
        if (err) {
            return next(err);
        }

        if (!user) {
            const response: THttpResponse = {
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
