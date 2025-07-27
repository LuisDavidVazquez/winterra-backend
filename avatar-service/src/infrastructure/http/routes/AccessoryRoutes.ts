import { Router } from 'express';
import { CreateAccessoryController } from '../controllers/CreateAccessoryController';
import { GetAllAccessoriesController } from '../controllers/GetAllAccessoriesController';
import { PurchaseAccessoryController } from '../controllers/PurchaseAccessoryController';
import { EquipAccessoryController } from '../controllers/EquipAccessoryController';
import { GetUserAccessoriesController } from '../controllers/GetUserAccessoriesController';

export function createAccessoryRoutes(
  createAccessoryController: CreateAccessoryController,
  getAllAccessoriesController: GetAllAccessoriesController,
  purchaseAccessoryController: PurchaseAccessoryController,
  equipAccessoryController: EquipAccessoryController,
  getUserAccessoriesController: GetUserAccessoriesController
): Router {
  const router = Router();

  // Accessory management routes
  router.post('/accessories', (req, res) => createAccessoryController.handle(req, res));
  router.get('/accessories', (req, res) => getAllAccessoriesController.handle(req, res));

  // User accessory routes
  router.get('/:userId/accessories', (req, res) => getUserAccessoriesController.handle(req, res));
  router.post('/:userId/accessories/purchase', (req, res) => purchaseAccessoryController.handle(req, res));
  router.post('/:userId/accessories/equip', (req, res) => equipAccessoryController.handle(req, res));

  return router;
} 