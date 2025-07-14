import * as amqp from 'amqplib';
import { UserEntity } from '../../domain/entities/UserEntity';

export interface UserCreatedEvent {
  type: 'USER_CREATED';
  data: {
    userId: string;
    email: string;
    name: string;
    plan: number;
    createdAt: string;
  };
  timestamp: string;
}

export class UserEventService {
  private connection: any = null;
  private channel: any = null;

  async initialize(): Promise<void> {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672');
      this.channel = await this.connection.createChannel();
      
      // Declare exchange for user events
      await this.channel.assertExchange('user_events', 'topic', { durable: true });
      
      console.log('UserEventService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize UserEventService:', error);
      throw error;
    }
  }

  async publishUserCreated(user: UserEntity): Promise<void> {
    if (!this.channel) {
      throw new Error('UserEventService not initialized');
    }

    const event: UserCreatedEvent = {
      type: 'USER_CREATED',
      data: {
        userId: user.getId(),
        email: user.getEmail().getValue(),
        name: user.getName().getValue(),
        plan: user.getPlan(),
        createdAt: user.getCreatedAt().toISOString()
      },
      timestamp: new Date().toISOString()
    };

    try {
      await this.channel.publish(
        'user_events',
        'user.created',
        Buffer.from(JSON.stringify(event)),
        { persistent: true }
      );
      
      console.log('User created event published:', event.data.userId);
    } catch (error) {
      console.error('Failed to publish user created event:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
    } catch (error) {
      console.error('Error closing RabbitMQ connections:', error);
    }
  }
} 