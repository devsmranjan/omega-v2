import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

import { TUser } from '../models';
import { responseError } from '../utils';

export const authenticated = function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', function (err: Error, user: TUser) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json(responseError('Unauthorized Access - No Token Provided!'));
        }

        // add to request
        req.user = {
            _id: user._id,
        };

        next();
    })(req, res, next);
};
