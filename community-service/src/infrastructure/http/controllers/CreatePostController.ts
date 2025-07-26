import { Request, Response } from 'express';
import { CreatePostUseCase } from '../../../application/use-cases/CreatePostUseCase';
import { CreatePostRequestDTO } from '../../../application/dtos/PostDTO';

export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request: CreatePostRequestDTO = req.body;

      const result = await this.createPostUseCase.execute(request);

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