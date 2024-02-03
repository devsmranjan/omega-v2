import { TUser, TUserSlim } from '../models';

export const getSlimUser = (user: TUser) => {
    const slimUser: TUserSlim = {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
    };

    return slimUser;
};
