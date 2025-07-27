import { Request, Response } from 'express';
import { GetAllHabitCategoriesUseCase } from '../../../application/use-cases/GetAllHabitCategoriesUseCase';

export class GetAllHabitCategoriesController {
  constructor(private getAllHabitCategoriesUseCase: GetAllHabitCategoriesUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllHabitCategoriesUseCase.execute();
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting habit categories:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error getting habit categories',
        data: null
      });
    }
  }
} 