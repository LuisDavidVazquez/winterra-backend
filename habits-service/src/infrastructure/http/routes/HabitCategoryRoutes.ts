import { Router } from 'express';
import {
  createHabitCategoryController,
  getAllHabitCategoriesController
} from '../dependencies/HabitsDependencies';

const router = Router();

// Habit Category Routes
router.post('/habit-categories', (req, res) => createHabitCategoryController.handle(req, res));
router.get('/habit-categories', (req, res) => getAllHabitCategoriesController.handle(req, res));

export default router; 