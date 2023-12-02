import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';

import { User } from '../schemas';

interface JwtPayload {
    id: string;
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

export const authConfig = (passport: PassportStatic) => {
    passport.use(
        new Strategy(options, async function (payload: JwtPayload, done: VerifiedCallback) {
            try {
                const user = await User.findById(payload.id);

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
