import { Request, Response } from 'express';
import { CreateReactionUseCase } from '../../../application/use-cases/CreateReactionUseCase';
import { CreateReactionRequestDTO } from '../../../application/dtos/ReactionDTO';

export class CreateReactionController {
  constructor(private createReactionUseCase: CreateReactionUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateReactionRequestDTO = req.body;

      const result = await this.createReactionUseCase.execute(request);

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