import { Request, Response } from 'express';
import { GetAllHabitsUseCase } from '../../../application/use-cases/GetAllHabitsUseCase';

export class GetAllHabitsController {
  constructor(private getAllHabitsUseCase: GetAllHabitsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllHabitsUseCase.execute();
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting habits:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error getting habits',
        data: null
      });
    }
  }
} 