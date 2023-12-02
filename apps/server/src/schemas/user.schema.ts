import { compareSync, genSalt, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { sign } from 'jsonwebtoken';
import { Model, Schema, model } from 'mongoose';

import { IEmailVerificationToken, IUser } from '../models';
import EmailVerificationTokenSchema from './email-verification-token.schema';

interface IUserMethods {
    comparePassword(password: string): number;
    generateJwt(): string;
    generateEmailVerificationToken(): string;
    generatePasswordReset(): void;
}

// Create a new Model type that knows about IUserMethods..
export type UserModel = Model<IUser, null, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Your email is required'],
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: [true, 'Your username is required'],
            trim: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [20, 'Username must be less than 20 characters'],
            match: [/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters'],
        },
        password: {
            type: String,
            required: [true, 'Your password is required'],
            trim: true,
            minlength: [8, 'Password must be at least 8 characters'],
        },
        name: {
            type: String,
            required: [true, 'Your name is required'],
            trim: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: {
            type: String,
            required: false,
        },
        resetPasswordExpires: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

// Convert password to hash before save
userSchema.pre('save', function (next) {
    // this is user

    if (!this.isModified('password')) {
        return next();
    }

    genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            this.password = hash;
            next();
        });
    });
});

// check password is correct or not
userSchema.method('comparePassword', function (password: string) {
    this._id;

    return compareSync(password, this.password);
});

// generate JWT token
userSchema.method('generateJwt', function () {
    const payload = {
        sub: this._id,
    };

    return sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }); // expires in 24 hours
});

// generate email verification token
userSchema.method('generateEmailVerificationToken', function () {
    const payload: IEmailVerificationToken = {
        userId: this._id,
        token: randomBytes(20).toString('hex'),
    };

    return new EmailVerificationTokenSchema(payload);
});

// Generate token and expire time for password reset
userSchema.method('generatePasswordReset', function () {
    this.resetPasswordToken = randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; // expires in 1 hour
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
