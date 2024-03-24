import { Document } from 'mongoose';

export type TSubscribedSheet = {
    uid: string;
    sheetTitle: string;
    sheetId: string;
    sheetTab: string;
} & Document;
