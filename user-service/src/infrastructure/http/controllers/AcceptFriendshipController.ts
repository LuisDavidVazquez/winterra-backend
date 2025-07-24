import { Request, Response } from 'express';
import { AcceptFriendshipUseCase } from '../../../application/use-cases/AcceptFriendshipUseCase';
import { AcceptFriendshipDTO } from '../../../application/dtos/FriendshipDTO';

export class AcceptFriendshipController {
  constructor(private acceptFriendshipUseCase: AcceptFriendshipUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { friendshipId } = req.params;
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const data: AcceptFriendshipDTO = { friendshipId, userId };
      const result = await this.acceptFriendshipUseCase.execute(data);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error accepting friendship:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 