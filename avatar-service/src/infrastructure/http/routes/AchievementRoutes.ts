import { Router } from 'express';
import { CreateAchievementController } from '../controllers/CreateAchievementController';
import { GetAllAchievementsController } from '../controllers/GetAllAchievementsController';
import { UnlockAchievementController } from '../controllers/UnlockAchievementController';
import { GetUserAchievementsController } from '../controllers/GetUserAchievementsController';

export function createAchievementRoutes(
  createAchievementController: CreateAchievementController,
  getAllAchievementsController: GetAllAchievementsController,
  unlockAchievementController: UnlockAchievementController,
  getUserAchievementsController: GetUserAchievementsController
): Router {
  const router = Router();

  // Achievement management routes
  router.post('/achievements', (req, res) => createAchievementController.handle(req, res));
  router.get('/achievements', (req, res) => getAllAchievementsController.handle(req, res));

  // User achievement routes
  router.get('/avatars/:userId/achievements', (req, res) => getUserAchievementsController.handle(req, res));
  router.post('/avatars/:userId/achievements/unlock', (req, res) => unlockAchievementController.handle(req, res));

  return router;
} 