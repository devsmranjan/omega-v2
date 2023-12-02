import { connect } from 'mongoose';

export const connectMongo = async () => {
    try {
        await connect(process.env.MONGO_URL);

        console.log('Database connected!');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
