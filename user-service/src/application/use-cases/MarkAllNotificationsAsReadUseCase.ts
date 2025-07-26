import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { MarkAllAsReadResponseDTO } from '../dtos/NotificationDTO';

export class MarkAllNotificationsAsReadUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(userId: string): Promise<MarkAllAsReadResponseDTO> {
    try {
      const success = await this.notificationRepository.markAllAsRead(userId);
      const unreadCount = await this.notificationRepository.countUnreadByUserId(userId);

      const response: MarkAllAsReadResponseDTO = {
        success: true,
        data: {
          userId,
          updatedCount: unreadCount === 0 ? 0 : await this.getUpdatedCount(userId)
        },
        message: 'All notifications marked as read successfully'
      };

      return response;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  private async getUpdatedCount(userId: string): Promise<number> {
    // This is a workaround since we don't have the exact count from the update operation
    // In a real scenario, you might want to return the affected rows count from the repository
    const unreadBefore = await this.notificationRepository.countUnreadByUserId(userId);
    return unreadBefore;
  }
} 