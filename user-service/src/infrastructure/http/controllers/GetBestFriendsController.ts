import { Request, Response } from 'express';
import { GetBestFriendsUseCase } from '../../../application/use-cases/GetBestFriendsUseCase';

export class GetBestFriendsController {
  constructor(private getBestFriendsUseCase: GetBestFriendsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const result = await this.getBestFriendsUseCase.execute(userId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting best friends:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 