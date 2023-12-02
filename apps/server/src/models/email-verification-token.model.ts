import { Document, Types } from 'mongoose';

export interface IEmailVerificationToken extends Document {
    userId: Types.ObjectId;
    token: string;
}
