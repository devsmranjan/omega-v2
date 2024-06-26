import { Document } from 'mongoose';
import { TSubscribedSheet } from './subscribed-sheet.model';
import { TSubscription } from './subscription.model';

export type TUser = {
    email: string;
    username: string;
    password: string;
    name: string;
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    refreshToken?: string;
    subscriptions?: TSubscription[];
    subscribedSheets?: TSubscribedSheet[];
} & Document;

export type TUserSlim = Pick<TUser, '_id' | 'email' | 'username' | 'name'>;
