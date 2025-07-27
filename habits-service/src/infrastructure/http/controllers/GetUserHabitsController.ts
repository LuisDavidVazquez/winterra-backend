import { Request, Response } from 'express';
import { GetUserHabitsUseCase } from '../../../application/use-cases/GetUserHabitsUseCase';

export class GetUserHabitsController {
  constructor(private getUserHabitsUseCase: GetUserHabitsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await this.getUserHabitsUseCase.execute(userId);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting user habits:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error getting user habits',
        data: null
      });
    }
  }
} 