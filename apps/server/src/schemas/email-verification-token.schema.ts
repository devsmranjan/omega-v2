import { Model, Schema, model } from 'mongoose';

import { IEmailVerificationToken } from '../models';

type EmailVerificationTokenModel = Model<IEmailVerificationToken>;

const emailVerificationTokenSchema = new Schema<IEmailVerificationToken, EmailVerificationTokenModel>(
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

const EmailVerificationToken = model<IEmailVerificationToken, EmailVerificationTokenModel>(
    'EmailVerificationToken',
    emailVerificationTokenSchema,
);

export default EmailVerificationToken;
