import { Router } from 'express';
import { missionController } from '../dependencies/RewardsDependencies';

const router = Router();

// Mission Routes
router.post('/', (req, res) => missionController.createMission(req, res));
router.get('/', (req, res) => missionController.getAllMissions(req, res));
router.get('/habit/:habitId', (req, res) => missionController.getMissionsByHabitId(req, res));

export default router; 