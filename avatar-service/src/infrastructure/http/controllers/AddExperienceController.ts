import { Request, Response } from 'express';
import { AddExperienceUseCase } from '../../../application/use-cases/AddExperienceUseCase';
import { AddExperienceRequestDTO } from '../../../application/dtos/AvatarDTO';

export class AddExperienceController {
  constructor(private addExperienceUseCase: AddExperienceUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const data: AddExperienceRequestDTO = req.body;
      const result = await this.addExperienceUseCase.execute(userId, data);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error adding experience:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error adding experience',
        data: null
      });
    }
  }
} 