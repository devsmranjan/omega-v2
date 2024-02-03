import { Document } from 'mongoose';

export type TUser = {
    email: string;
    username: string;
    password: string;
    name: string;
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
} & Document;
