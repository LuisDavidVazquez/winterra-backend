import { Router } from 'express';
import {
  createAchievementController,
  getAllAchievementsController,
  unlockAchievementController,
  getUserAchievementsController
} from '../dependencies/AvatarDependencies';

const router = Router();

// Achievement management routes (MUST come before parameterized routes)
router.post('/achievements', (req, res) => createAchievementController.handle(req, res));
router.get('/achievements', (req, res) => getAllAchievementsController.handle(req, res));

// User achievement routes (parameterized routes come after specific routes)
router.get('/:userId/achievements', (req, res) => getUserAchievementsController.handle(req, res));
router.post('/:userId/achievements/unlock', (req, res) => unlockAchievementController.handle(req, res));

export default router; 