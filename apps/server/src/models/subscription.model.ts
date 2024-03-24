import { Document } from 'mongoose';

export type TSubscription = {
    uid: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    scope: string;
    idToken: string;
    tokenType: string;
    expiryDate: number;
} & Document;
