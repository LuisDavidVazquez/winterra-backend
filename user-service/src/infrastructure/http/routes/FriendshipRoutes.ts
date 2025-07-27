import { Router } from 'express';
import { 
  createFriendshipController,
  acceptFriendshipController,
  rejectFriendshipController,
  setBestFriendController,
  removeBestFriendController,
  deleteFriendshipController,
  getFriendshipsController,
  getBestFriendsController,
  getPendingFriendRequestsController
} from '../dependencies/FriendshipDependencies';

const router = Router();

// Friendship Routes
router.post('/friendships', (req, res) => createFriendshipController.handle(req, res));
router.get('/:userId/friendships', (req, res) => getFriendshipsController.handle(req, res));
router.get('/:userId/friend-requests', (req, res) => getPendingFriendRequestsController.handle(req, res));
router.get('/:userId/best-friends', (req, res) => getBestFriendsController.handle(req,  res));

// Friendship Management Routes
router.put('/friendships/:friendshipId/accept', (req, res) => acceptFriendshipController.handle(req, res));
router.put('/friendships/:friendshipId/reject', (req, res) => rejectFriendshipController.handle(req, res));
router.put('/friendships/:friendshipId/set-best-friend', (req, res) => setBestFriendController.handle(req, res));
router.put('/friendships/:friendshipId/remove-best-friend', (req, res) => removeBestFriendController.handle(req, res));
router.delete('/friendships/:friendshipId', (req, res) => deleteFriendshipController.handle(req, res));

export default router; 