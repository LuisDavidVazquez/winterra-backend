import { Request, Response } from 'express';
import { CreateHabitUseCase } from '../../../application/use-cases/CreateHabitUseCase';
import { CreateHabitRequestDTO } from '../../../application/dtos/HabitDTO';

export class CreateHabitController {
  constructor(private createHabitUseCase: CreateHabitUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateHabitRequestDTO = req.body;
      const result = await this.createHabitUseCase.execute(data);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating habit:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating habit',
        data: null
      });
    }
  }
} 