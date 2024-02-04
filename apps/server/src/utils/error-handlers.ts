import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { responseError } from './response';

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(StatusCodes.NOT_FOUND));
};

export const handleErrors = (err: Error, req: Request, res: Response) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // error response
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        responseError(err?.message ?? 'Error occurred while handling the request', err),
    );
};
