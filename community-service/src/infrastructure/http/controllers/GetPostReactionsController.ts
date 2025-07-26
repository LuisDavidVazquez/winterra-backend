import { Request, Response } from 'express';
import { GetPostReactionsUseCase } from '../../../application/use-cases/GetPostReactionsUseCase';

export class GetPostReactionsController {
  constructor(private getPostReactionsUseCase: GetPostReactionsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.postId;

      const result = await this.getPostReactionsUseCase.execute(postId);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
} 