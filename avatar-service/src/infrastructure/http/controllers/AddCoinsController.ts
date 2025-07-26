import { Request, Response } from 'express';
import { AddCoinsUseCase } from '../../../application/use-cases/AddCoinsUseCase';
import { AddCoinsRequestDTO } from '../../../application/dtos/AvatarDTO';

export class AddCoinsController {
  constructor(private addCoinsUseCase: AddCoinsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const data: AddCoinsRequestDTO = req.body;
      const result = await this.addCoinsUseCase.execute(userId, data);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error adding coins:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error adding coins',
        data: null
      });
    }
  }
} 