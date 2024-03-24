export const withPrefix = (endpoint: string) => {
    const prefix = process.env.API_PREFIX ?? '';

    return prefix + endpoint;
};
