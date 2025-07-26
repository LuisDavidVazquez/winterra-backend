import { Request, Response } from 'express';
import { CreateEncouragementNoteUseCase } from '../../../application/use-cases/CreateEncouragementNoteUseCase';
import { CreateEncouragementNoteRequestDTO } from '../../../application/dtos/EncouragementNoteDTO';

export class CreateEncouragementNoteController {
  constructor(private createEncouragementNoteUseCase: CreateEncouragementNoteUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateEncouragementNoteRequestDTO = req.body;

      const result = await this.createEncouragementNoteUseCase.execute(request);

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