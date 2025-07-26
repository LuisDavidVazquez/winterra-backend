import { RabbitMQConnection } from '../../../config/rabbitmq/connection';
import { UserCreatedEventDTO } from '../../application/dtos/UserEventDTO';

export class UserEventService {
  private rabbitMQ: RabbitMQConnection;

  constructor() {
    this.rabbitMQ = RabbitMQConnection.getInstance();
  }

  async publishUserCreatedEvent(userData: {
    id: string;
    firebaseUid: string;
    name: string;
    email: string;
    plan: number;
    createdAt: Date;
  }): Promise<boolean> {
    try {
      const event: UserCreatedEventDTO = {
        eventType: 'USER_CREATED',
        userId: userData.id,
        firebaseUid: userData.firebaseUid,
        name: userData.name,
        email: userData.email,
        plan: userData.plan,
        createdAt: userData.createdAt.toISOString(),
        timestamp: Date.now()
      };

      const success = await this.rabbitMQ.publishMessage(
        'user.events',
        'user.created',
        event
      );

      if (success) {
        console.log('📤 Evento USER_CREATED publicado exitosamente');
      } else {
        console.error('❌ Error publicando evento USER_CREATED');
      }

      return success;
    } catch (error) {
      console.error('❌ Error en UserEventService.publishUserCreatedEvent:', error);
      return false;
    }
  }

  async publishUserEvent(eventType: string, userId: string, data: any): Promise<boolean> {
    try {
      const event = {
        eventType,
        userId,
        data,
        timestamp: Date.now()
      };

      const success = await this.rabbitMQ.publishMessage(
        'user.events',
        `user.${eventType.toLowerCase()}`,
        event
      );

      if (success) {
        console.log(`📤 Evento ${eventType} publicado exitosamente`);
      } else {
        console.error(`❌ Error publicando evento ${eventType}`);
      }

      return success;
    } catch (error) {
      console.error(`❌ Error en UserEventService.publishUserEvent (${eventType}):`, error);
      return false;
    }
  }
} 