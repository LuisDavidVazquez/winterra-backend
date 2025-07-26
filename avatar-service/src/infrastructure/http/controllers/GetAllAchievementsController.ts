import { Request, Response } from 'express';
import { GetAllAchievementsUseCase } from '../../../application/use-cases/GetAllAchievementsUseCase';

export class GetAllAchievementsController {
  constructor(private getAllAchievementsUseCase: GetAllAchievementsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllAchievementsUseCase.execute();

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