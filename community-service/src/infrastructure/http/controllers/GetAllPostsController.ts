import { Request, Response } from 'express';
import { GetAllPostsUseCase } from '../../../application/use-cases/GetAllPostsUseCase';

export class GetAllPostsController {
  constructor(private getAllPostsUseCase: GetAllPostsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllPostsUseCase.execute();

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