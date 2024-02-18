import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

import { responseError } from '../utils';

export const authenticated = function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function (err: Error, userId: number | string) {
        if (err) {
            return next(err);
        }

        if (!userId) {
            return res.status(StatusCodes.FORBIDDEN).json(responseError('Forbidden'));
        }

        console.log({ userId });

        // add to request
        req.user = {
            _id: userId,
        };

        next();
    })(req, res, next);
};
