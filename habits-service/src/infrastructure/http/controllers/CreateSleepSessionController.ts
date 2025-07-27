import { Request, Response } from 'express';
import { CreateSleepSessionUseCase } from '../../../application/use-cases/CreateSleepSessionUseCase';
import { CreateSleepSessionRequestDTO } from '../../../application/dtos/SleepSessionDTO';

export class CreateSleepSessionController {
  constructor(private createSleepSessionUseCase: CreateSleepSessionUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateSleepSessionRequestDTO = req.body;
      const result = await this.createSleepSessionUseCase.execute(data);
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating sleep session:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error creating sleep session',
        data: null
      });
    }
  }
} 