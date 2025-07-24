import { Request, Response } from 'express';
import { RemoveBestFriendUseCase } from '../../../application/use-cases/RemoveBestFriendUseCase';
import { RemoveBestFriendDTO } from '../../../application/dtos/FriendshipDTO';

export class RemoveBestFriendController {
  constructor(private removeBestFriendUseCase: RemoveBestFriendUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { friendshipId } = req.params;
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const data: RemoveBestFriendDTO = { friendshipId, userId };
      const result = await this.removeBestFriendUseCase.execute(data);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error removing best friend:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 