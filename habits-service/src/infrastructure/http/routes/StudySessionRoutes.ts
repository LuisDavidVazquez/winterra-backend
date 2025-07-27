import { Router } from 'express';
import {
  createStudySessionController,
  getStudySessionsByUserHabitController
} from '../dependencies/HabitsDependencies';

const router = Router();

// Study session routes
router.post('/study-sessions', (req, res) => createStudySessionController.handle(req, res));
router.get('/user-habits/:userHabitId/study-sessions', (req, res) => getStudySessionsByUserHabitController.handle(req, res));

export default router; 