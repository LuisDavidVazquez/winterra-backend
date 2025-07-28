import { Router } from 'express';
import { habitDuelController } from '../dependencies/HabitsDependencies';

const router = Router();

// Habit Duel Routes
router.post('/', (req, res) => habitDuelController.createHabitDuel(req, res));
router.get('/', (req, res) => habitDuelController.getAllHabitDuels(req, res));
router.get('/:id', (req, res) => habitDuelController.getHabitDuelById(req, res));
router.put('/accept', (req, res) => habitDuelController.acceptHabitDuel(req, res));
router.put('/reject', (req, res) => habitDuelController.rejectHabitDuel(req, res));
router.put('/complete', (req, res) => habitDuelController.completeHabitDuel(req, res));
router.get('/user/:userId', (req, res) => habitDuelController.getDuelsByUserId(req, res));
router.delete('/:id', (req, res) => habitDuelController.deleteHabitDuel(req, res));

export default router; 