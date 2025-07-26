import { Router } from 'express';
import { 
  createAvatarController, 
  getAvatarController, 
  getAllAvatarsController,
  addExperienceController,
  addCoinsController,
  spendCoinsController
} from '../../http/dependencies/AvatarDependencies';

const router = Router();

// Avatar Routes
router.post('/avatars', (req, res) => createAvatarController.handle(req, res));
router.get('/avatars', (req, res) => getAllAvatarsController.handle(req, res));
router.get('/avatars/:userId', (req, res) => getAvatarController.handle(req, res));

// Avatar Actions
router.post('/avatars/:userId/experience', (req, res) => addExperienceController.handle(req, res));
router.post('/avatars/:userId/coins', (req, res) => addCoinsController.handle(req, res));
router.post('/avatars/:userId/spend-coins', (req, res) => spendCoinsController.handle(req, res));

export default router; 