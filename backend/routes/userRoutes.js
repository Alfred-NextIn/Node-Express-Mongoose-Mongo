import express from 'express';
import { getUser, loginUser, registerUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/user',protect, getUser);


export default userRoutes;
