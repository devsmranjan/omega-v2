import { Model, Schema, model } from 'mongoose';

import { TEmailVerificationToken } from '../models';

type EmailVerificationTokenModel = Model<TEmailVerificationToken>;

const emailVerificationTokenSchema = new Schema<TEmailVerificationToken, EmailVerificationTokenModel>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        token: {
            type: String,
            required: true,
        },
        // createdAt: {
        //     type: Date,
        //     required: true,
        //     default: Date.now,
        //     expires: 43200,
        // },
    },
    {
        timestamps: true,
    },
);

export const EmailVerificationToken = model<TEmailVerificationToken, EmailVerificationTokenModel>(
    'EmailVerificationToken',
    emailVerificationTokenSchema,
);
