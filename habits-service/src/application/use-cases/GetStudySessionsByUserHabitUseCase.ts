import { StudySessionRepository } from '../../domain/repositories/StudySessionRepository';
import { GetAllStudySessionsResponseDTO } from '../dtos/StudySessionDTO';

export class GetStudySessionsByUserHabitUseCase {
  constructor(private studySessionRepository: StudySessionRepository) {}

  async execute(userHabitId: string): Promise<GetAllStudySessionsResponseDTO> {
    try {
      const studySessions = await this.studySessionRepository.findByUserHabitId(userHabitId);

      const response: GetAllStudySessionsResponseDTO = {
        success: true,
        data: studySessions.map(session => ({
          id: session.getId(),
          userHabitId: session.getUserHabitId(),
          subject: session.getSubject(),
          topic: session.getTopic(),
          focusLevel: session.getFocusLevel()?.getValue() || null,
          notes: session.getNotes(),
          durationMinutes: session.getDurationMinutes(),
          startedAt: session.getStartedAt()?.toISOString() || null,
          endedAt: session.getEndedAt()?.toISOString() || null,
          createdAt: session.getCreatedAt().toISOString()
        })),
        message: 'Study sessions retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve study sessions: ${error.message}`);
    }
  }
} 