export type THttpResponse<T = unknown> = {
    success: boolean;
    message: string;
    data?: T;
    error?: Error;
};
