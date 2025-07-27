import { Request, Response } from 'express';
import { GetStudySessionsByUserHabitUseCase } from '../../../application/use-cases/GetStudySessionsByUserHabitUseCase';

export class GetStudySessionsByUserHabitController {
  constructor(private getStudySessionsByUserHabitUseCase: GetStudySessionsByUserHabitUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userHabitId } = req.params;
      const result = await this.getStudySessionsByUserHabitUseCase.execute(userHabitId);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting study sessions:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error getting study sessions',
        data: null
      });
    }
  }
} 