export const endpoints = {
    REFRESH: '/refresh',

    API: process.env.API_ENDPOINT,
    API_DOCS: `${process.env.API_ENDPOINT}/docs`,

    // auth
    AUTH: `/auth`,
    AUTH_SIGNUP: '/signup',
    AUTH_LOGIN: '/login',
    AUTH_VERIFY_EMAIL: '/verify/:token',
    AUTH_VERIFY_FULL: `${process.env.SERVER_ROUTE}${process.env.API_ENDPOINT}/auth/verify`,
    AUTH_VERIFY_EMAIL_RESEND: '/resend',
    AUTH_RECOVER: '/recover',
    AUTH_CHECK_RESET_LINK: '/reset/:token',
    AUTH_RESET: '/reset/:token',
    AUTH_RESET_FULL: `${process.env.SERVER_ROUTE}${process.env.API_ENDPOINT}/auth/reset`,

    // user
    USER: `/user`,
    USER_UPDATE: '/update',
    USER_UPDATE_PASSWORD: '/password-update',
    USER_DELETE_ACCOUNT: '/account-delete',

    // Client
    CLIENT_RESET_PASSWORD_PATH: '/password-reset',
    CLIENT_EMAIL_VERIFICATION_PATH: '/email-verify',

    // subscriptions
    SUBSCRIPTIONS: `/subscriptions`,
    SUBSCRIPTIONS_ADD_GOOGLE: '/add/google',
    SUBSCRIPTIONS_ADD_GOOGLE_CALLBACK: '/add/google/callback',
    SUBSCRIPTIONS_UPDATE_SUBSCRIPTION: '/subscription-update',

    // spreadsheets
    SPREADSHEETS: `${process.env.API_ENDPOINT}/spreadsheets`,
};
