export interface IHttpResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: Error;
}
