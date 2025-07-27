import { Request, Response } from 'express';
import { UpdateUserHabitUseCase } from '../../../application/use-cases/UpdateUserHabitUseCase';
import { UpdateUserHabitRequestDTO } from '../../../application/dtos/UserHabitDTO';

export class UpdateUserHabitController {
  constructor(private updateUserHabitUseCase: UpdateUserHabitUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userHabitId } = req.params;
      const data: UpdateUserHabitRequestDTO = req.body;
      const result = await this.updateUserHabitUseCase.execute(userHabitId, data);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating user habit:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error updating user habit',
        data: null
      });
    }
  }
} 