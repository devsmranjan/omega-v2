import { Types } from 'mongoose';

export interface IEmailVerificationToken {
    userId: Types.ObjectId;
    token: string;
    // createdAt: Date;
}
