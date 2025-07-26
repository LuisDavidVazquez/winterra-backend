import { Router } from 'express';
import { createReactionController, deleteReactionController, getPostReactionsController } from '../dependencies/CommunityDependencies';

const router = Router();

// Reaction management routes
router.post('/reactions', (req, res) => createReactionController.handle(req, res));
router.delete('/reactions', (req, res) => deleteReactionController.handle(req, res));

// Post reactions routes
router.get('/posts/:postId/reactions', (req, res) => getPostReactionsController.handle(req, res));

export default router; 