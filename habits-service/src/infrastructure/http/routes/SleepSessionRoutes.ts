import { Router } from 'express';
import {
  createSleepSessionController,
  getSleepSessionsByUserHabitController
} from '../dependencies/HabitsDependencies';

const router = Router();

// Sleep session routes
router.post('/sleep-sessions', (req, res) => createSleepSessionController.handle(req, res));
router.get('/user-habits/:userHabitId/sleep-sessions', (req, res) => getSleepSessionsByUserHabitController.handle(req, res));

export default router; 