import { Request, Response } from 'express';
import { GetPostUseCase } from '../../../application/use-cases/GetPostUseCase';

export class GetPostController {
  constructor(private getPostUseCase: GetPostUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.postId;

      const result = await this.getPostUseCase.execute(postId);

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