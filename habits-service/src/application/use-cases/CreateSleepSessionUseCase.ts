import { SleepSessionRepository } from '../../domain/repositories/SleepSessionRepository';
import { CreateSleepSessionRequestDTO, CreateSleepSessionResponseDTO } from '../dtos/SleepSessionDTO';
import { IUUIDService } from '../../domain/services/IUUIDService';

export class CreateSleepSessionUseCase {
  constructor(
    private sleepSessionRepository: SleepSessionRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(data: CreateSleepSessionRequestDTO): Promise<CreateSleepSessionResponseDTO> {
    try {
      const sessionId = this.uuidService.generate();
      
      // Convertir strings de tiempo a Date objects
      const sleepTime = this.parseTimeString(data.sleepTime);
      const wakeUpTime = this.parseTimeString(data.wakeUpTime);
      
      const sleepSession = new (await import('../../domain/entities/SleepSessionEntity')).SleepSessionEntity(
        sessionId,
        data.userHabitId,
        sleepTime,
        wakeUpTime,
        data.totalHours || null,
        data.sleepQuality || null,
        data.notes || null
      );

      const savedSleepSession = await this.sleepSessionRepository.save(sleepSession);

      const response: CreateSleepSessionResponseDTO = {
        success: true,
        data: {
          id: savedSleepSession.getId(),
          userHabitId: savedSleepSession.getUserHabitId(),
          sleepTime: savedSleepSession.getSleepTime().toTimeString().slice(0, 5),
          wakeUpTime: savedSleepSession.getWakeUpTime().toTimeString().slice(0, 5),
          totalHours: savedSleepSession.getTotalHours(),
          sleepQuality: savedSleepSession.getSleepQuality()?.getValue() || null,
          notes: savedSleepSession.getNotes(),
          createdAt: savedSleepSession.getCreatedAt().toISOString()
        },
        message: 'Sleep session created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create sleep session: ${error.message}`);
    }
  }

  private parseTimeString(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
} 