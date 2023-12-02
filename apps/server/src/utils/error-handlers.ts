import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { IHttpResponse } from '../models';

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(StatusCodes.NOT_FOUND));
};

export const handleErrors = (err: Error, req: Request, res: Response) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    const response: IHttpResponse = {
        success: false,
        message: err?.message ?? 'Error occurred while handling the request',
        error: err,
    };

    // error response
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};
