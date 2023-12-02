import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    name: string;
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
}
