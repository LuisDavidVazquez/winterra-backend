import { Request, Response } from 'express';
import { MarkNotificationAsReadUseCase } from '../../../application/use-cases/MarkNotificationAsReadUseCase';

export class MarkNotificationAsReadController {
  constructor(private markNotificationAsReadUseCase: MarkNotificationAsReadUseCase) {}

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

      const result = await this.markNotificationAsReadUseCase.execute(notificationId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in MarkNotificationAsReadController:', error);
      
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