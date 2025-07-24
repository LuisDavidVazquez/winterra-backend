import { Router } from 'express';
import { getAllUsersController, firebaseAuthController } from '../dependencies/UserDependies';

const router = Router();

// Auth Routes
router.post('/auth/firebase', (req, res) => firebaseAuthController.handle(req, res));

// User Routes
router.get('/users', (req, res) => getAllUsersController.handle(req, res));

export default router; 