import { Request, Response } from 'express';
import { GetAllHabitTypesUseCase } from '../../../application/use-cases/GetAllHabitTypesUseCase';

export class GetAllHabitTypesController {
  constructor(private getAllHabitTypesUseCase: GetAllHabitTypesUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllHabitTypesUseCase.execute();
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting habit types:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error getting habit types',
        data: null
      });
    }
  }
} 