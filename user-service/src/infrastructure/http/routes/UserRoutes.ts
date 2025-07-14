import { Router } from 'express';
import { createUserController, getAllUsersController } from '../dependencies/UserDependies';

const router = Router();

// Routes
router.post('/users', (req, res) => createUserController.handle(req, res));
router.get('/users', (req, res) => getAllUsersController.handle(req, res));

export default router; 