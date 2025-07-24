import { Request, Response } from 'express';
import { GetFriendshipsUseCase } from '../../../application/use-cases/GetFriendshipsUseCase';
import { GetFriendshipsDTO } from '../../../application/dtos/FriendshipDTO';

export class GetFriendshipsController {
  constructor(private getFriendshipsUseCase: GetFriendshipsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { status } = req.query;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const data: GetFriendshipsDTO = { 
        userId, 
        status: status as string | undefined 
      };
      const result = await this.getFriendshipsUseCase.execute(data);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting friendships:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 