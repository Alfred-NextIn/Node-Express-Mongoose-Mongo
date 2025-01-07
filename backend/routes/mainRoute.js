import express from 'express';
import { getGoals, getGoal, setGoal, updateGoal, deleteGoal } from '../controllers/mainController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

//router.get('/', getGoals);

// router.put('/:id', updateGoal);

// router.delete('/:id', deleteGoal);

//more improved way of joining routes without having to define each separately

router.route('/:id').get(protect, getGoal).put(protect, updateGoal).delete(protect, deleteGoal);

router.route('/').get(protect,getGoals).post(protect,setGoal);


export default router;