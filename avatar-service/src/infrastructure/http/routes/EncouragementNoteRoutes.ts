import { Router } from 'express';
import { CreateEncouragementNoteController } from '../controllers/CreateEncouragementNoteController';
import { GetAvatarEncouragementNotesController } from '../controllers/GetAvatarEncouragementNotesController';
import { GetAllEncouragementNotesController } from '../controllers/GetAllEncouragementNotesController';

export function createEncouragementNoteRoutes(
  createEncouragementNoteController: CreateEncouragementNoteController,
  getAvatarEncouragementNotesController: GetAvatarEncouragementNotesController,
  getAllEncouragementNotesController: GetAllEncouragementNotesController
): Router {
  const router = Router();

  // Encouragement note management routes
  router.post('/encouragement-notes', (req, res) => createEncouragementNoteController.handle(req, res));
  router.get('/encouragement-notes', (req, res) => getAllEncouragementNotesController.handle(req, res));

  // Avatar encouragement notes routes
  router.get('/avatars/:avatarId/encouragement-notes', (req, res) => getAvatarEncouragementNotesController.handle(req, res));

  return router;
} 