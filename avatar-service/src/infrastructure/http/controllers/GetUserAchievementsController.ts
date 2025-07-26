import { Request, Response } from 'express';
import { GetUserAchievementsUseCase } from '../../../application/use-cases/GetUserAchievementsUseCase';

export class GetUserAchievementsController {
  constructor(private getUserAchievementsUseCase: GetUserAchievementsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      const result = await this.getUserAchievementsUseCase.execute(userId);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
} 