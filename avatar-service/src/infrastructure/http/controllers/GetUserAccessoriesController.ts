import { Request, Response } from 'express';
import { GetUserAccessoriesUseCase } from '../../../application/use-cases/GetUserAccessoriesUseCase';

export class GetUserAccessoriesController {
  constructor(private getUserAccessoriesUseCase: GetUserAccessoriesUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      const result = await this.getUserAccessoriesUseCase.execute(userId);

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