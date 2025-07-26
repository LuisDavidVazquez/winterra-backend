import { NotificationTypeValue, NotificationType } from '../value-objects/NotificationType';

export class NotificationEntity {
  private readonly id: string;
  private readonly userId: string;
  private readonly typeNotification: NotificationTypeValue;
  private readonly title: string;
  private readonly content: string;
  private isRead: boolean;
  private readonly createdAt: Date;

  constructor(
    id: string,
    userId: string,
    typeNotification: NotificationTypeValue,
    title: string,
    content: string,
    isRead: boolean = false,
    createdAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.typeNotification = typeNotification;
    this.title = title;
    this.content = content;
    this.isRead = isRead;
    this.createdAt = createdAt || new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getTypeNotification(): NotificationTypeValue {
    return this.typeNotification;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getIsRead(): boolean {
    return this.isRead;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  markAsRead(): void {
    this.isRead = true;
  }

  markAsUnread(): void {
    this.isRead = false;
  }

  isNotificationRead(): boolean {
    return this.isRead;
  }

  getTypeName(): string {
    return NotificationTypeValue.getTypeName(this.typeNotification.getValue());
  }
} 