import { Repository } from 'typeorm';
import { NotificationEntity } from '../../domain/entities/NotificationEntity';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { NotificationModel } from '../models/NotificationModel';
import { NotificationTypeValue } from '../../domain/value-objects/NotificationType';

export class PostgreSQLNotificationRepository implements INotificationRepository {
  constructor(private repository: Repository<NotificationModel>) {}

  async save(notification: NotificationEntity): Promise<NotificationEntity> {
    const notificationModel = new NotificationModel();
    notificationModel.id = notification.getId();
    notificationModel.userId = notification.getUserId();
    notificationModel.typeNotification = notification.getTypeNotification().getValue();
    notificationModel.title = notification.getTitle();
    notificationModel.content = notification.getContent();
    notificationModel.isRead = notification.getIsRead();
    notificationModel.createdAt = notification.getCreatedAt();

    const savedModel = await this.repository.save(notificationModel);
    return this.mapToEntity(savedModel);
  }

  async findById(id: string): Promise<NotificationEntity | null> {
    const notification = await this.repository.findOne({ where: { id } });
    return notification ? this.mapToEntity(notification) : null;
  }

  async findByUserId(userId: string): Promise<NotificationEntity[]> {
    const notifications = await this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });
    return notifications.map(notification => this.mapToEntity(notification));
  }

  async findByUserIdAndType(userId: string, type: number): Promise<NotificationEntity[]> {
    const notifications = await this.repository.find({
      where: { userId, typeNotification: type },
      order: { createdAt: 'DESC' }
    });
    return notifications.map(notification => this.mapToEntity(notification));
  }

  async findUnreadByUserId(userId: string): Promise<NotificationEntity[]> {
    const notifications = await this.repository.find({
      where: { userId, isRead: false },
      order: { createdAt: 'DESC' }
    });
    return notifications.map(notification => this.mapToEntity(notification));
  }

  async markAsRead(id: string): Promise<boolean> {
    const result = await this.repository.update(id, { isRead: true });
    return result.affected ? result.affected > 0 : false;
  }

  async markAllAsRead(userId: string): Promise<boolean> {
    const result = await this.repository.update(
      { userId, isRead: false },
      { isRead: true }
    );
    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async countUnreadByUserId(userId: string): Promise<number> {
    return await this.repository.count({
      where: { userId, isRead: false }
    });
  }

  private mapToEntity(notificationModel: NotificationModel): NotificationEntity {
    const typeNotification = NotificationTypeValue.fromNumber(notificationModel.typeNotification);
    
    return new NotificationEntity(
      notificationModel.id,
      notificationModel.userId,
      typeNotification,
      notificationModel.title,
      notificationModel.content,
      notificationModel.isRead,
      notificationModel.createdAt
    );
  }
} 