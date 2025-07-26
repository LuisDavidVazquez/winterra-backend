import { Request, Response } from 'express';
import { MarkAllNotificationsAsReadUseCase } from '../../../application/use-cases/MarkAllNotificationsAsReadUseCase';

export class MarkAllNotificationsAsReadController {
  constructor(private markAllNotificationsAsReadUseCase: MarkAllNotificationsAsReadUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'Missing required parameter: userId'
        });
        return;
      }

      const result = await this.markAllNotificationsAsReadUseCase.execute(userId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error in MarkAllNotificationsAsReadController:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 