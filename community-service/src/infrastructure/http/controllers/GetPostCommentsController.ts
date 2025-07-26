import { Request, Response } from 'express';
import { GetPostCommentsUseCase } from '../../../application/use-cases/GetPostCommentsUseCase';

export class GetPostCommentsController {
  constructor(private getPostCommentsUseCase: GetPostCommentsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.postId;

      const result = await this.getPostCommentsUseCase.execute(postId);

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