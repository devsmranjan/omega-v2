export interface IUser {
    email: string;
    username: string;
    password: string;
    name: string;
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
}
