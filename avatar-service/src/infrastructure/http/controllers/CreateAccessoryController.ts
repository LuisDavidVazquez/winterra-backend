import { Request, Response } from 'express';
import { CreateAccessoryUseCase } from '../../../application/use-cases/CreateAccessoryUseCase';
import { CreateAccessoryRequestDTO } from '../../../application/dtos/AccessoryDTO';

export class CreateAccessoryController {
  constructor(private createAccessoryUseCase: CreateAccessoryUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateAccessoryRequestDTO = req.body;

      const result = await this.createAccessoryUseCase.execute(request);

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