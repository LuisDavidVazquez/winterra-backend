import { Request, Response } from 'express';
import { GetAllAvatarsUseCase } from '../../../application/use-cases/GetAllAvatarsUseCase';

export class GetAllAvatarsController {
  constructor(private getAllAvatarsUseCase: GetAllAvatarsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllAvatarsUseCase.execute();
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting all avatars:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error getting avatars',
        data: null
      });
    }
  }
} 