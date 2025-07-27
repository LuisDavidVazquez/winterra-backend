import { Router } from 'express';
import {
  createHabitController,
  getAllHabitsController
} from '../dependencies/HabitsDependencies';

const router = Router();

// Habit management routes
router.post('/habits', (req, res) => createHabitController.handle(req, res));
router.get('/habits', (req, res) => getAllHabitsController.handle(req, res));

export default router; 