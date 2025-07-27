import { Request, Response } from 'express';
import { CreateUserHabitUseCase } from '../../../application/use-cases/CreateUserHabitUseCase';
import { CreateUserHabitRequestDTO } from '../../../application/dtos/UserHabitDTO';

export class CreateUserHabitController {
  constructor(private createUserHabitUseCase: CreateUserHabitUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const data: CreateUserHabitRequestDTO = req.body;
      const result = await this.createUserHabitUseCase.execute(userId, data);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating user habit:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating user habit',
        data: null
      });
    }
  }
} 