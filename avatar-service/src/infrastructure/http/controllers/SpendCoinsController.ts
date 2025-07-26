import { Request, Response } from 'express';
import { SpendCoinsUseCase } from '../../../application/use-cases/SpendCoinsUseCase';
import { SpendCoinsRequestDTO } from '../../../application/dtos/AvatarDTO';

export class SpendCoinsController {
  constructor(private spendCoinsUseCase: SpendCoinsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const data: SpendCoinsRequestDTO = req.body;
      const result = await this.spendCoinsUseCase.execute(userId, data);
      
      if (!result.success) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error('Error spending coins:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error spending coins',
        data: null
      });
    }
  }
} 