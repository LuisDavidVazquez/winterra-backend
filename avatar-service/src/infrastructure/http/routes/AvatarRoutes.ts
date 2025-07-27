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
router.post('/', (req, res) => createAvatarController.handle(req, res));
router.get('/', (req, res) => getAllAvatarsController.handle(req, res));
router.get('/:userId', (req, res) => getAvatarController.handle(req, res));

// Avatar Actions
router.post('/:userId/experience', (req, res) => addExperienceController.handle(req, res));
router.post('/:userId/coins', (req, res) => addCoinsController.handle(req, res));
router.post('/:userId/spend-coins', (req, res) => spendCoinsController.handle(req, res));

export default router; 