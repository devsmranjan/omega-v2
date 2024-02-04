export const responseSuccess = <T>(message: string, data?: T) => {
    return {
        data: {
            success: true,
            message,
            data,
        },
    };
};

export const responseError = (message: string, error?: Error | Record<string, unknown>) => {
    return {
        success: false,
        message,
        error,
    };
};
