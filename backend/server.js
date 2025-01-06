import express from 'express';
import dotenv from 'dotenv';
import router from './routes/mainRoute.js';
import errorHandler from './middleware/error.js';
import colors from 'colors';
import connectDB from './config/db.js';

connectDB();
const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals',router);

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on port: ${port}`));
