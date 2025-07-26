export enum NotificationType {
  FRIENDSHIP = 1,
  ACHIEVEMENT = 2,
  HABIT = 3
}

export class NotificationTypeValue {
  private readonly value: NotificationType;

  constructor(value: NotificationType) {
    this.validate(value);
    this.value = value;
  }

  private validate(value: NotificationType): void {
    if (!Object.values(NotificationType).includes(value)) {
      throw new Error(`Invalid notification type: ${value}`);
    }
  }

  getValue(): NotificationType {
    return this.value;
  }

  static fromNumber(value: number): NotificationTypeValue {
    return new NotificationTypeValue(value as NotificationType);
  }

  static getTypeName(type: NotificationType): string {
    switch (type) {
      case NotificationType.FRIENDSHIP:
        return 'friendship';
      case NotificationType.ACHIEVEMENT:
        return 'achievement';
      case NotificationType.HABIT:
        return 'habit';
      default:
        return 'unknown';
    }
  }
} 