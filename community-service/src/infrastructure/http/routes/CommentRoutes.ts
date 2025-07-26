import { Router } from 'express';
import { createCommentController, getPostCommentsController } from '../dependencies/CommunityDependencies';

const router = Router();

// Comment management routes
router.post('/comments', (req, res) => createCommentController.handle(req, res));

// Post comments routes
router.get('/posts/:postId/comments', (req, res) => getPostCommentsController.handle(req, res));

export default router; 