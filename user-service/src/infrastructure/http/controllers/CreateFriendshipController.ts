import { Request, Response } from 'express';
import { CreateFriendshipUseCase } from '../../../application/use-cases/CreateFriendshipUseCase';
import { CreateFriendshipDTO } from '../../../application/dtos/FriendshipDTO';

export class CreateFriendshipController {
  constructor(private createFriendshipUseCase: CreateFriendshipUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId, friendId } = req.body;

      if (!userId || !friendId) {
        res.status(400).json({ error: 'userId and friendId are required' });
        return;
      }

      const data: CreateFriendshipDTO = { userId, friendId };
      const result = await this.createFriendshipUseCase.execute(data);

      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating friendship:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 