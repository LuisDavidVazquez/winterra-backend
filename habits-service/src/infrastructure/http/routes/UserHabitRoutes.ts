import { Router } from 'express';
import {
  createUserHabitController,
  getUserHabitsController
} from '../dependencies/HabitsDependencies';

const router = Router();

// User Habit Routes
router.post('/:userId/habits', (req, res) => createUserHabitController.handle(req, res));
router.get('/:userId/habits', (req, res) => getUserHabitsController.handle(req, res));

export default router; 