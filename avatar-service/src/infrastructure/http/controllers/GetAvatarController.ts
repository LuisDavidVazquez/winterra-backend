import { Request, Response } from 'express';
import { GetAvatarUseCase } from '../../../application/use-cases/GetAvatarUseCase';

export class GetAvatarController {
  constructor(private getAvatarUseCase: GetAvatarUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this.getAvatarUseCase.execute(userId);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting avatar:', error);
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : 'Avatar not found',
        data: null
      });
    }
  }
} 