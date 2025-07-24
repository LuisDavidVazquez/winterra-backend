import { Request, Response } from 'express';
import { GetPendingFriendRequestsUseCase } from '../../../application/use-cases/GetPendingFriendRequestsUseCase';

export class GetPendingFriendRequestsController {
  constructor(private getPendingFriendRequestsUseCase: GetPendingFriendRequestsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const result = await this.getPendingFriendRequestsUseCase.execute(userId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting pending friend requests:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 