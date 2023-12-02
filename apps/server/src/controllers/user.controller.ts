import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IHttpResponse } from '../models';

export const getUser = async (req: Request, res: Response) => {
    const response: IHttpResponse<unknown> = {
        success: true,
        message: 'Successfully get data',
        data: {
            id: 1,
        },
    };

    res.status(StatusCodes.OK).json(response);
};
