export interface AvatarCreatedEventDTO {
  eventType: 'AVATAR_CREATED';
  avatarId: string;
  userId: string;
  experience: number;
  level: number;
  coins: number;
  streakDays: number;
  createdAt: string;
  timestamp: number;
}

export interface AvatarUpdatedEventDTO {
  eventType: 'AVATAR_UPDATED';
  avatarId: string;
  userId: string;
  experience: number;
  level: number;
  coins: number;
  streakDays: number;
  updatedAt: string;
  timestamp: number;
}

export interface AvatarEventDTO {
  eventType: string;
  avatarId: string;
  userId: string;
  data: any;
  timestamp: number;
} 