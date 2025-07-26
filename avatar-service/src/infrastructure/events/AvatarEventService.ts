import { RabbitMQConnection } from '../../../config/rabbitmq/connection';
import { AvatarCreatedEventDTO, AvatarUpdatedEventDTO } from '../../application/dtos/AvatarEventDTO';

export class AvatarEventService {
  private rabbitMQ: RabbitMQConnection;

  constructor() {
    this.rabbitMQ = RabbitMQConnection.getInstance();
  }

  async publishAvatarCreatedEvent(avatarData: {
    id: string;
    userId: string;
    experience: number;
    level: number;
    coins: number;
    streakDays: number;
    createdAt: Date;
  }): Promise<boolean> {
    try {
      const event: AvatarCreatedEventDTO = {
        eventType: 'AVATAR_CREATED',
        avatarId: avatarData.id,
        userId: avatarData.userId,
        experience: avatarData.experience,
        level: avatarData.level,
        coins: avatarData.coins,
        streakDays: avatarData.streakDays,
        createdAt: avatarData.createdAt.toISOString(),
        timestamp: Date.now()
      };

      const success = await this.rabbitMQ.publishMessage(
        'avatar.events',
        'avatar.created',
        event
      );

      if (success) {
        console.log('📤 Evento AVATAR_CREATED publicado exitosamente');
      } else {
        console.error('❌ Error publicando evento AVATAR_CREATED');
      }

      return success;
    } catch (error) {
      console.error('❌ Error en AvatarEventService.publishAvatarCreatedEvent:', error);
      return false;
    }
  }

  async publishAvatarUpdatedEvent(avatarData: {
    id: string;
    userId: string;
    experience: number;
    level: number;
    coins: number;
    streakDays: number;
    updatedAt: Date;
  }): Promise<boolean> {
    try {
      const event: AvatarUpdatedEventDTO = {
        eventType: 'AVATAR_UPDATED',
        avatarId: avatarData.id,
        userId: avatarData.userId,
        experience: avatarData.experience,
        level: avatarData.level,
        coins: avatarData.coins,
        streakDays: avatarData.streakDays,
        updatedAt: avatarData.updatedAt.toISOString(),
        timestamp: Date.now()
      };

      const success = await this.rabbitMQ.publishMessage(
        'avatar.events',
        'avatar.updated',
        event
      );

      if (success) {
        console.log('📤 Evento AVATAR_UPDATED publicado exitosamente');
      } else {
        console.error('❌ Error publicando evento AVATAR_UPDATED');
      }

      return success;
    } catch (error) {
      console.error('❌ Error en AvatarEventService.publishAvatarUpdatedEvent:', error);
      return false;
    }
  }

  async publishAvatarEvent(eventType: string, avatarId: string, userId: string, data: any): Promise<boolean> {
    try {
      const event = {
        eventType,
        avatarId,
        userId,
        data,
        timestamp: Date.now()
      };

      const success = await this.rabbitMQ.publishMessage(
        'avatar.events',
        `avatar.${eventType.toLowerCase()}`,
        event
      );

      if (success) {
        console.log(`📤 Evento ${eventType} publicado exitosamente`);
      } else {
        console.error(`❌ Error publicando evento ${eventType}`);
      }

      return success;
    } catch (error) {
      console.error(`❌ Error en AvatarEventService.publishAvatarEvent (${eventType}):`, error);
      return false;
    }
  }
} 