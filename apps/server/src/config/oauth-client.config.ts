import { google } from 'googleapis';

const redirectURL = `http://localhost:4200/api/subscriptions/add/google/callback`;

export const oAuth2Client = {
    redirectURL,
    auth: new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectURL),
};
