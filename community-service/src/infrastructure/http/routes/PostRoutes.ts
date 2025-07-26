import { Router } from 'express';
import { createPostController, getAllPostsController, getPostController } from '../dependencies/CommunityDependencies';

const router = Router();

// Post management routes
router.post('/posts', (req, res) => createPostController.handle(req, res));
router.get('/posts', (req, res) => getAllPostsController.handle(req, res));
router.get('/posts/:postId', (req, res) => getPostController.handle(req, res));

export default router; 