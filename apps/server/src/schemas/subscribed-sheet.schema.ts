import { Model, Schema, model } from 'mongoose';
import { TSubscribedSheet } from '../models';

export type SubscribedSheetModel = Model<TSubscribedSheet, null, null>;

const subscribedSheetSchema = new Schema<TSubscribedSheet, SubscribedSheetModel>(
    {
        uid: String,
        sheetTitle: String,
        sheetId: String,
        sheetTab: String,
    },
    {
        timestamps: true,
    },
);

export const SubscribedSheet = model('SubscribedSheet', subscribedSheetSchema);
