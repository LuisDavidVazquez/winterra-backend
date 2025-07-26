import { NotificationEntity } from '../entities/NotificationEntity';

export interface INotificationRepository {
  save(notification: NotificationEntity): Promise<NotificationEntity>;
  findById(id: string): Promise<NotificationEntity | null>;
  findByUserId(userId: string): Promise<NotificationEntity[]>;
  findByUserIdAndType(userId: string, type: number): Promise<NotificationEntity[]>;
  findUnreadByUserId(userId: string): Promise<NotificationEntity[]>;
  markAsRead(id: string): Promise<boolean>;
  markAllAsRead(userId: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  countUnreadByUserId(userId: string): Promise<number>;
} 