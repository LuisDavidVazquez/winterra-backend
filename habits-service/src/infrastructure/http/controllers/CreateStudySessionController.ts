import { Request, Response } from 'express';
import { CreateStudySessionUseCase } from '../../../application/use-cases/CreateStudySessionUseCase';
import { CreateStudySessionRequestDTO } from '../../../application/dtos/StudySessionDTO';

export class CreateStudySessionController {
  constructor(private createStudySessionUseCase: CreateStudySessionUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateStudySessionRequestDTO = req.body;
      const result = await this.createStudySessionUseCase.execute(data);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating study session:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating study session',
        data: null
      });
    }
  }
} 