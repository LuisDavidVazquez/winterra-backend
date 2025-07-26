import { Request, Response } from 'express';
import { EquipAccessoryUseCase } from '../../../application/use-cases/EquipAccessoryUseCase';
import { EquipAccessoryRequestDTO } from '../../../application/dtos/AvatarAccessoryDTO';

export class EquipAccessoryController {
  constructor(private equipAccessoryUseCase: EquipAccessoryUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const request: EquipAccessoryRequestDTO = req.body;

      const result = await this.equipAccessoryUseCase.execute(userId, request);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
} 