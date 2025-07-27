import { Router } from 'express';
import { userMissionController } from '../dependencies/RewardsDependencies';

const router = Router();

// User Mission Routes
router.post('/assign', (req, res) => userMissionController.assignMission(req, res));
router.put('/:userMissionId/progress', (req, res) => userMissionController.updateProgress(req, res));
router.get('/user/:userHabitsId', (req, res) => userMissionController.getUserMissions(req, res));

export default router; 