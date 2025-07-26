import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { GetNotificationsResponseDTO } from '../dtos/NotificationDTO';

export class GetNotificationsUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(userId: string, type?: number): Promise<GetNotificationsResponseDTO> {
    try {
      let notifications;
      
      if (type) {
        notifications = await this.notificationRepository.findByUserIdAndType(userId, type);
      } else {
        notifications = await this.notificationRepository.findByUserId(userId);
      }

      const unreadCount = await this.notificationRepository.countUnreadByUserId(userId);

      const response: GetNotificationsResponseDTO = {
        success: true,
        data: {
          notifications: notifications.map(notification => ({
            id: notification.getId(),
            userId: notification.getUserId(),
            typeNotification: notification.getTypeNotification().getValue(),
            typeName: notification.getTypeName(),
            title: notification.getTitle(),
            content: notification.getContent(),
            isRead: notification.getIsRead(),
            createdAt: notification.getCreatedAt().toISOString()
          })),
          total: notifications.length,
          unreadCount
        },
        message: 'Notifications retrieved successfully'
      };

      return response;
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  }
} 