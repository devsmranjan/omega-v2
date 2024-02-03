import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';

import passport from 'passport';
import { authConfig, connectMongo } from './config';
import { authenticated } from './middlewares';
import { userRouter } from './routes';
import { authRouter } from './routes/auth.route';
import { Endpoints, handleErrors, handleNotFound, withPrefix } from './utils';

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

// passport
app.use(passport.initialize());
authConfig(passport);

app.get(withPrefix('/'), (req, res) => {
    res.send({ message: `Hello API ${process.env.MONGO_URL}` });
});

// auth
app.use(withPrefix(Endpoints.AUTH), authRouter);

// user
app.use(withPrefix(Endpoints.USER), authenticated, userRouter);

// handle errors

// 404
app.use(handleNotFound);

// error handler
app.use(handleErrors);

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
