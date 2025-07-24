import { Request, Response } from 'express';
import { RejectFriendshipUseCase } from '../../../application/use-cases/RejectFriendshipUseCase';
import { RejectFriendshipDTO } from '../../../application/dtos/FriendshipDTO';

export class RejectFriendshipController {
  constructor(private rejectFriendshipUseCase: RejectFriendshipUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { friendshipId } = req.params;
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const data: RejectFriendshipDTO = { friendshipId, userId };
      const result = await this.rejectFriendshipUseCase.execute(data);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error rejecting friendship:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 