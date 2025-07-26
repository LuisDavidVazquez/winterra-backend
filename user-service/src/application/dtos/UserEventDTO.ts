export interface UserCreatedEventDTO {
  eventType: 'USER_CREATED';
  userId: string;
  firebaseUid: string;
  name: string;
  email: string;
  plan: number;
  createdAt: string;
  timestamp: number;
}

export interface UserEventDTO {
  eventType: string;
  userId: string;
  data: any;
  timestamp: number;
} 