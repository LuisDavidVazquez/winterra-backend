import { Request, Response } from 'express';
import { CreateAvatarUseCase } from '../../../application/use-cases/CreateAvatarUseCase';
import { CreateAvatarRequestDTO } from '../../../application/dtos/AvatarDTO';

export class CreateAvatarController {
  constructor(private createAvatarUseCase: CreateAvatarUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateAvatarRequestDTO = req.body;
      const result = await this.createAvatarUseCase.execute(data);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating avatar:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating avatar',
        data: null
      });
    }
  }
} 