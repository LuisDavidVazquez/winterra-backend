export interface CreateNotificationDTO {
  userId: string;
  typeNotification: number;
  title: string;
  content: string;
}

export interface NotificationResponseDTO {
  id: string;
  userId: string;
  typeNotification: number;
  typeName: string;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface GetNotificationsResponseDTO {
  success: boolean;
  data: {
    notifications: NotificationResponseDTO[];
    total: number;
    unreadCount: number;
  };
  message: string;
}

export interface CreateNotificationResponseDTO {
  success: boolean;
  data: NotificationResponseDTO;
  message: string;
}

export interface MarkAsReadResponseDTO {
  success: boolean;
  data: {
    notificationId: string;
    isRead: boolean;
  };
  message: string;
}

export interface MarkAllAsReadResponseDTO {
  success: boolean;
  data: {
    userId: string;
    updatedCount: number;
  };
  message: string;
}

export interface DeleteNotificationResponseDTO {
  success: boolean;
  data: {
    notificationId: string;
    deleted: boolean;
  };
  message: string;
} 