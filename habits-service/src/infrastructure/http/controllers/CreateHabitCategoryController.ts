import { Request, Response } from 'express';
import { CreateHabitCategoryUseCase } from '../../../application/use-cases/CreateHabitCategoryUseCase';
import { CreateHabitCategoryRequestDTO } from '../../../application/dtos/HabitCategoryDTO';

export class CreateHabitCategoryController {
  constructor(private createHabitCategoryUseCase: CreateHabitCategoryUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateHabitCategoryRequestDTO = req.body;
      const result = await this.createHabitCategoryUseCase.execute(data);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating habit category:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating habit category',
        data: null
      });
    }
  }
} 