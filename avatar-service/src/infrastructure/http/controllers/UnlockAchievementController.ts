import { Request, Response } from 'express';
import { UnlockAchievementUseCase } from '../../../application/use-cases/UnlockAchievementUseCase';
import { UnlockAchievementRequestDTO } from '../../../application/dtos/AvatarAchievementDTO';

export class UnlockAchievementController {
  constructor(private unlockAchievementUseCase: UnlockAchievementUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const request: UnlockAchievementRequestDTO = req.body;

      const result = await this.unlockAchievementUseCase.execute(userId, request);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
} 