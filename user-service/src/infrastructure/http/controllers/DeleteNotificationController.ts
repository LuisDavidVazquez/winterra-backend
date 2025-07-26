import { Request, Response } from 'express';
import { DeleteNotificationUseCase } from '../../../application/use-cases/DeleteNotificationUseCase';

export class DeleteNotificationController {
  constructor(private deleteNotificationUseCase: DeleteNotificationUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { notificationId } = req.params;

      if (!notificationId) {
        res.status(400).json({
          success: false,
          message: 'Missing required parameter: notificationId'
        });
        return;
      }

      const result = await this.deleteNotificationUseCase.execute(notificationId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in DeleteNotificationController:', error);
      
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({
          success: false,
          message: 'Notification not found'
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 