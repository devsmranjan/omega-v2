import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { THttpResponse } from '../models';

export const getUser = async (req: Request, res: Response) => {
    const response: THttpResponse<unknown> = {
        success: true,
        message: 'Successfully get data',
        data: {
            id: 1,
        },
    };

    res.status(StatusCodes.OK).json(response);
};
