import { Model, Schema, model } from 'mongoose';
import { TSubscription } from '../models';

export type SubscriptionModel = Model<TSubscription, null, null>;

const subscriptionSchema = new Schema<TSubscription, SubscriptionModel>(
    {
        uid: String,
        email: String,
        accessToken: String,
        refreshToken: String,
        scope: String,
        idToken: String,
        tokenType: String,
        expiryDate: Number,
    },
    {
        timestamps: true,
    },
);

export const Subscription = model('Subscription', subscriptionSchema);
