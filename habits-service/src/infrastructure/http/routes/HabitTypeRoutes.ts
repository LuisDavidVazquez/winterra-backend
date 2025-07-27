import { Router } from 'express';
import {
  createHabitTypeController,
  getAllHabitTypesController
} from '../dependencies/HabitsDependencies';

const router = Router();

// Habit Type Routes
router.post('/habit-types', (req, res) => createHabitTypeController.handle(req, res));
router.get('/habit-types', (req, res) => getAllHabitTypesController.handle(req, res));

export default router; 