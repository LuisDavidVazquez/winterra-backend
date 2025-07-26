import { Request, Response } from 'express';
import { CreateAchievementUseCase } from '../../../application/use-cases/CreateAchievementUseCase';
import { CreateAchievementRequestDTO } from '../../../application/dtos/AchievementDTO';

export class CreateAchievementController {
  constructor(private createAchievementUseCase: CreateAchievementUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateAchievementRequestDTO = req.body;

      const result = await this.createAchievementUseCase.execute(request);

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
} 