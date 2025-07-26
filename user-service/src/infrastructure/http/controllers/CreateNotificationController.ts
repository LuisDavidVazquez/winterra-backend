import { Request, Response } from 'express';
import { CreateNotificationUseCase } from '../../../application/use-cases/CreateNotificationUseCase';
import { CreateNotificationDTO } from '../../../application/dtos/NotificationDTO';

export class CreateNotificationController {
  constructor(private createNotificationUseCase: CreateNotificationUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const notificationData: CreateNotificationDTO = req.body;

      // Validaciones básicas
      if (!notificationData.userId || !notificationData.title || !notificationData.content) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: userId, title, content'
        });
        return;
      }

      if (!notificationData.typeNotification || ![1, 2, 3].includes(notificationData.typeNotification)) {
        res.status(400).json({
          success: false,
          message: 'Invalid notification type. Must be 1 (friendship), 2 (achievement), or 3 (habit)'
        });
        return;
      }

      const result = await this.createNotificationUseCase.execute(notificationData);

      res.status(201).json(result);
    } catch (error) {
      console.error('Error in CreateNotificationController:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 