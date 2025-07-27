import { Request, Response } from 'express';
import { CreateHabitTypeUseCase } from '../../../application/use-cases/CreateHabitTypeUseCase';
import { CreateHabitTypeRequestDTO } from '../../../application/dtos/HabitTypeDTO';

export class CreateHabitTypeController {
  constructor(private createHabitTypeUseCase: CreateHabitTypeUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateHabitTypeRequestDTO = req.body;
      const result = await this.createHabitTypeUseCase.execute(data);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating habit type:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating habit type',
        data: null
      });
    }
  }
} 