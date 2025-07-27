import { Router } from 'express';
import {
  createEncouragementNoteController,
  getAvatarEncouragementNotesController,
  getAllEncouragementNotesController
} from '../dependencies/AvatarDependencies';

const router = Router();

// Encouragement note management routes (MUST come before parameterized routes)
router.post('/encouragement-notes', (req, res) => createEncouragementNoteController.handle(req, res));
router.get('/encouragement-notes', (req, res) => getAllEncouragementNotesController.handle(req, res));

// Avatar encouragement notes routes (parameterized routes come after specific routes)
router.get('/:avatarId/encouragement-notes', (req, res) => getAvatarEncouragementNotesController.handle(req, res));

export default router; 