import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';

import { User } from '../schemas';

interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

export const authConfig = (passport: PassportStatic) => {
    passport.use(
        new Strategy(options, async function (payload: JwtPayload, done: VerifiedCallback) {
            try {
                console.log(payload);

                const user = await User.findById(payload.sub);

                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            } catch (error) {
                return done(error, false);
            }
        }),
    );
};
