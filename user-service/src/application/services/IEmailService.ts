export interface IEmailService {
  sendWelcomeEmail(userData: {
    id: string;
    name: string;
    email: string;
    plan: number;
    joinDate: Date;
  }): Promise<boolean>;
} 