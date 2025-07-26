import { UserCreatedEventDTO } from '../dtos/UserEventDTO';

export class UserEventHandler {
  async handleUserCreated(event: UserCreatedEventDTO): Promise<void> {
    try {
      console.log('🎉 Procesando evento USER_CREATED:', {
        userId: event.userId,
        name: event.name,
        email: event.email,
        plan: event.plan,
        timestamp: new Date(event.timestamp).toISOString()
      });

      // Aquí puedes agregar lógica adicional para procesar el evento
      // Por ejemplo:
      // - Crear perfiles adicionales en otros servicios
      // - Enviar notificaciones
      // - Actualizar estadísticas
      // - Crear registros de auditoría

      console.log('✅ Evento USER_CREATED procesado exitosamente');
    } catch (error) {
      console.error('❌ Error procesando evento USER_CREATED:', error);
      throw error;
    }
  }

  async handleUserEvent(eventType: string, eventData: any): Promise<void> {
    try {
      console.log(`📋 Procesando evento ${eventType}:`, eventData);

      switch (eventType) {
        case 'USER_CREATED':
          await this.handleUserCreated(eventData as UserCreatedEventDTO);
          break;
        case 'USER_UPDATED':
          await this.handleUserUpdated(eventData);
          break;
        case 'USER_DELETED':
          await this.handleUserDeleted(eventData);
          break;
        default:
          console.warn(`⚠️ Evento no manejado: ${eventType}`);
      }
    } catch (error) {
      console.error(`❌ Error procesando evento ${eventType}:`, error);
      throw error;
    }
  }

  private async handleUserUpdated(eventData: any): Promise<void> {
    console.log('📝 Procesando actualización de usuario:', eventData);
    // Implementar lógica para actualización de usuario
  }

  private async handleUserDeleted(eventData: any): Promise<void> {
    console.log('🗑️ Procesando eliminación de usuario:', eventData);
    // Implementar lógica para eliminación de usuario
  }
} 