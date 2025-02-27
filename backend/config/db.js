import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn= await mongoose.connect(uri);

        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;