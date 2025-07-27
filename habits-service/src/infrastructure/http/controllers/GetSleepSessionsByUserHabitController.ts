import { Request, Response } from 'express';
import { GetSleepSessionsByUserHabitUseCase } from '../../../application/use-cases/GetSleepSessionsByUserHabitUseCase';

export class GetSleepSessionsByUserHabitController {
  constructor(private getSleepSessionsByUserHabitUseCase: GetSleepSessionsByUserHabitUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userHabitId } = req.params;
      const result = await this.getSleepSessionsByUserHabitUseCase.execute(userHabitId);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting sleep sessions:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error getting sleep sessions',
        data: null
      });
    }
  }
} 