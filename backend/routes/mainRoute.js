import express from 'express';
import { getGoals, getGoal, setGoal, updateGoal, deleteGoal } from '../controllers/mainController.js';

const router = express.Router();

//router.get('/', getGoals);

// router.put('/:id', updateGoal);

// router.delete('/:id', deleteGoal);

//more improved way of joining routes without having to define each separately

router.route('/:id').get(getGoal).put(updateGoal).delete(deleteGoal);

router.route('/').get(getGoals).post(setGoal);


export default router;