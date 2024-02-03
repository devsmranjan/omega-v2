import { Document, Types } from 'mongoose';

export type TEmailVerificationToken = {
    userId: Types.ObjectId;
    token: string;
} & Document;
