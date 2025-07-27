import { SleepSessionRepository } from '../../domain/repositories/SleepSessionRepository';
import { GetAllSleepSessionsResponseDTO } from '../dtos/SleepSessionDTO';

export class GetSleepSessionsByUserHabitUseCase {
  constructor(private sleepSessionRepository: SleepSessionRepository) {}

  async execute(userHabitId: string): Promise<GetAllSleepSessionsResponseDTO> {
    try {
      const sleepSessions = await this.sleepSessionRepository.findByUserHabitId(userHabitId);

      const response: GetAllSleepSessionsResponseDTO = {
        success: true,
        data: sleepSessions.map(session => ({
          id: session.getId(),
          userHabitId: session.getUserHabitId(),
          sleepTime: session.getSleepTime().toTimeString().slice(0, 5),
          wakeUpTime: session.getWakeUpTime().toTimeString().slice(0, 5),
          totalHours: session.getTotalHours(),
          sleepQuality: session.getSleepQuality()?.getValue() || null,
          notes: session.getNotes(),
          createdAt: session.getCreatedAt().toISOString()
        })),
        message: 'Sleep sessions retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve sleep sessions: ${error.message}`);
    }
  }
} 