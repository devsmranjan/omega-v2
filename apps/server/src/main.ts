import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import { connectMongo } from './config';
import { userRouter } from './routes';
import { Endpoints, handleErrors, handleNotFound } from './utils';

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

// user
app.use(Endpoints.USER, userRouter);

// handle errors

// 404
app.use(handleNotFound);

// error handler
app.use(handleErrors);

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
