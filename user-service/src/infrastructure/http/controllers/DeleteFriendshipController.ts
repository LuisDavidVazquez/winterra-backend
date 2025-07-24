import { Request, Response } from 'express';
import { DeleteFriendshipUseCase } from '../../../application/use-cases/DeleteFriendshipUseCase';
import { DeleteFriendshipDTO } from '../../../application/dtos/FriendshipDTO';

export class DeleteFriendshipController {
  constructor(private deleteFriendshipUseCase: DeleteFriendshipUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { friendshipId } = req.params;
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const data: DeleteFriendshipDTO = { friendshipId, userId };
      await this.deleteFriendshipUseCase.execute(data);

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting friendship:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 