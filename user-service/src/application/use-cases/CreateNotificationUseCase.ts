import { NotificationEntity } from '../../domain/entities/NotificationEntity';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { CreateNotificationDTO, CreateNotificationResponseDTO } from '../dtos/NotificationDTO';
import { NotificationTypeValue } from '../../domain/value-objects/NotificationType';
import { IUUIDService } from '../services/IUUIDService';

export class CreateNotificationUseCase {
  constructor(
    private notificationRepository: INotificationRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(data: CreateNotificationDTO): Promise<CreateNotificationResponseDTO> {
    try {
      const typeNotification = NotificationTypeValue.fromNumber(data.typeNotification);
      
      const notification = new NotificationEntity(
        this.uuidService.generate(),
        data.userId,
        typeNotification,
        data.title,
        data.content
      );

      const savedNotification = await this.notificationRepository.save(notification);

      const response: CreateNotificationResponseDTO = {
        success: true,
        data: {
          id: savedNotification.getId(),
          userId: savedNotification.getUserId(),
          typeNotification: savedNotification.getTypeNotification().getValue(),
          typeName: savedNotification.getTypeName(),
          title: savedNotification.getTitle(),
          content: savedNotification.getContent(),
          isRead: savedNotification.getIsRead(),
          createdAt: savedNotification.getCreatedAt().toISOString()
        },
        message: 'Notification created successfully'
      };

      return response;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }
} 