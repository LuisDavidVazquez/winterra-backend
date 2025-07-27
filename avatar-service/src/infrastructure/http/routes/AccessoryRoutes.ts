import { Router } from 'express';
import {
  createAccessoryController,
  getAllAccessoriesController,
  purchaseAccessoryController,
  equipAccessoryController,
  getUserAccessoriesController
} from '../dependencies/AvatarDependencies';

const router = Router();

// Accessory management routes (MUST come before parameterized routes)
router.post('/accessories', (req, res) => createAccessoryController.handle(req, res));
router.get('/accessories', (req, res) => getAllAccessoriesController.handle(req, res));

// User accessory routes (parameterized routes come after specific routes)
router.get('/:userId/accessories', (req, res) => getUserAccessoriesController.handle(req, res));
router.post('/:userId/accessories/purchase', (req, res) => purchaseAccessoryController.handle(req, res));
router.post('/:userId/accessories/equip', (req, res) => equipAccessoryController.handle(req, res));

export default router; 