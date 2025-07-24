import { Request, Response } from 'express';
import { SetBestFriendUseCase } from '../../../application/use-cases/SetBestFriendUseCase';
import { SetBestFriendDTO } from '../../../application/dtos/FriendshipDTO';

export class SetBestFriendController {
  constructor(private setBestFriendUseCase: SetBestFriendUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { friendshipId } = req.params;
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const data: SetBestFriendDTO = { friendshipId, userId };
      const result = await this.setBestFriendUseCase.execute(data);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error setting best friend:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 