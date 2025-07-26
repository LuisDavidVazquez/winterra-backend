import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { MarkAsReadResponseDTO } from '../dtos/NotificationDTO';

export class MarkNotificationAsReadUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(notificationId: string): Promise<MarkAsReadResponseDTO> {
    try {
      const success = await this.notificationRepository.markAsRead(notificationId);

      if (!success) {
        throw new Error('Notification not found or already marked as read');
      }

      const response: MarkAsReadResponseDTO = {
        success: true,
        data: {
          notificationId,
          isRead: true
        },
        message: 'Notification marked as read successfully'
      };

      return response;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
} 