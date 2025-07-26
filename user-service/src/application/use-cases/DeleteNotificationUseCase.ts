import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { DeleteNotificationResponseDTO } from '../dtos/NotificationDTO';

export class DeleteNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(notificationId: string): Promise<DeleteNotificationResponseDTO> {
    try {
      const success = await this.notificationRepository.delete(notificationId);

      if (!success) {
        throw new Error('Notification not found');
      }

      const response: DeleteNotificationResponseDTO = {
        success: true,
        data: {
          notificationId,
          deleted: true
        },
        message: 'Notification deleted successfully'
      };

      return response;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }
} 