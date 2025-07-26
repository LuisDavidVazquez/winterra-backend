import { Request, Response } from 'express';
import { CreateCommentUseCase } from '../../../application/use-cases/CreateCommentUseCase';
import { CreateCommentRequestDTO } from '../../../application/dtos/CommentDTO';

export class CreateCommentController {
  constructor(private createCommentUseCase: CreateCommentUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateCommentRequestDTO = req.body;

      const result = await this.createCommentUseCase.execute(request);

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
} 