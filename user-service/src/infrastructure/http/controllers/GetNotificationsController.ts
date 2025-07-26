import { Request, Response } from 'express';
import { GetNotificationsUseCase } from '../../../application/use-cases/GetNotificationsUseCase';

export class GetNotificationsController {
  constructor(private getNotificationsUseCase: GetNotificationsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { type } = req.query;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'Missing required parameter: userId'
        });
        return;
      }

      let notificationType: number | undefined;
      if (type) {
        const typeNumber = parseInt(type as string);
        if (isNaN(typeNumber) || ![1, 2, 3].includes(typeNumber)) {
          res.status(400).json({
            success: false,
            message: 'Invalid notification type. Must be 1 (friendship), 2 (achievement), or 3 (habit)'
          });
          return;
        }
        notificationType = typeNumber;
      }

      const result = await this.getNotificationsUseCase.execute(userId, notificationType);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in GetNotificationsController:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 