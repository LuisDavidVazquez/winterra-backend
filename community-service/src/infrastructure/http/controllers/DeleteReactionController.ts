import { Request, Response } from 'express';
import { DeleteReactionUseCase } from '../../../application/use-cases/DeleteReactionUseCase';

export class DeleteReactionController {
  constructor(private deleteReactionUseCase: DeleteReactionUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId, postId } = req.body;

      if (!userId || !postId) {
        res.status(400).json({
          success: false,
          data: null,
          message: 'User ID and Post ID are required'
        });
        return;
      }

      const result = await this.deleteReactionUseCase.execute(userId, postId);

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