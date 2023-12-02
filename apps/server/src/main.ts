import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import logger from 'morgan';
import { connectMongo } from './config';
import { IHttpResponse } from './models';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // urlencoded: It parses incoming requests with URL-encoded payloads and is based on body-parser. (for forms)
app.use(logger('dev'));
app.use(cookieParser());

// database config
connectMongo();

app.get('/', (req, res) => {
    res.send({ message: `Hello API ${process.env.MONGO_URL}` });
});

// handle errors

// 404
app.use((req, res, next) => {
    next(createHttpError(StatusCodes.NOT_FOUND));
});

// error handler
app.use((err: Error, req: Request, res: Response) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    const response: IHttpResponse = {
        success: false,
        message: err?.message ?? 'Error occurred while handling the request',
        error: err,
    };

    // error response
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
});

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
