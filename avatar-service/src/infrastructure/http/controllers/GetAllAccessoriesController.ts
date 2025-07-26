import { Request, Response } from 'express';
import { GetAllAccessoriesUseCase } from '../../../application/use-cases/GetAllAccessoriesUseCase';

export class GetAllAccessoriesController {
  constructor(private getAllAccessoriesUseCase: GetAllAccessoriesUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllAccessoriesUseCase.execute();

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