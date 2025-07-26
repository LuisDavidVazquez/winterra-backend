import { Request, Response } from 'express';
import { GetAllEncouragementNotesUseCase } from '../../../application/use-cases/GetAllEncouragementNotesUseCase';

export class GetAllEncouragementNotesController {
  constructor(private getAllEncouragementNotesUseCase: GetAllEncouragementNotesUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllEncouragementNotesUseCase.execute();

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
} 