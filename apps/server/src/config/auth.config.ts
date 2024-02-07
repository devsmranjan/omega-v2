import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';

export type TJwtPayload = {
    sub: string;
    iat: number;
    exp: number;
};

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

// it wll verify jwt token
export const authConfig = (passport: PassportStatic) => {
    passport.use(
        new Strategy(options, async function (payload: TJwtPayload, done: VerifiedCallback) {
            try {
                // payload.sub is userId
                return done(null, payload.sub);
            } catch (error) {
                return done(error, false);
            }
        }),
    );
};
