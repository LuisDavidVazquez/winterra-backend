import { Request, Response } from 'express';
import { PurchaseAccessoryUseCase } from '../../../application/use-cases/PurchaseAccessoryUseCase';
import { PurchaseAccessoryRequestDTO } from '../../../application/dtos/AvatarAccessoryDTO';

export class PurchaseAccessoryController {
  constructor(private purchaseAccessoryUseCase: PurchaseAccessoryUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const request: PurchaseAccessoryRequestDTO = req.body;

      const result = await this.purchaseAccessoryUseCase.execute(userId, request);

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