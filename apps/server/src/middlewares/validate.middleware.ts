import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { responseError } from '../utils';

export const validate = function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error: Record<string, unknown> = {};

        console.error(errors);

        errors.array().map((err) => (error[err['path']] = err.msg));

        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(responseError('Validation error', error));
    }

    next();
};

export const validateCredentials = function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    console.error(errors);

    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(responseError('Invalid credentials'));
    }

    next();
};
