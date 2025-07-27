import { StudySessionRepository } from '../../domain/repositories/StudySessionRepository';
import { CreateStudySessionRequestDTO, CreateStudySessionResponseDTO } from '../dtos/StudySessionDTO';
import { IUUIDService } from '../../domain/services/IUUIDService';

export class CreateStudySessionUseCase {
  constructor(
    private studySessionRepository: StudySessionRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(data: CreateStudySessionRequestDTO): Promise<CreateStudySessionResponseDTO> {
    try {
      const sessionId = this.uuidService.generate();
      
      const studySession = new (await import('../../domain/entities/StudySessionEntity')).StudySessionEntity(
        sessionId,
        data.userHabitId,
        data.subject || null,
        data.topic || null,
        data.focusLevel || null,
        data.notes || null,
        data.durationMinutes || null,
        data.startedAt ? new Date(data.startedAt) : null,
        data.endedAt ? new Date(data.endedAt) : null
      );

      const savedStudySession = await this.studySessionRepository.save(studySession);

      const response: CreateStudySessionResponseDTO = {
        success: true,
        data: {
          id: savedStudySession.getId(),
          userHabitId: savedStudySession.getUserHabitId(),
          subject: savedStudySession.getSubject(),
          topic: savedStudySession.getTopic(),
          focusLevel: savedStudySession.getFocusLevel()?.getValue() || null,
          notes: savedStudySession.getNotes(),
          durationMinutes: savedStudySession.getDurationMinutes(),
          startedAt: savedStudySession.getStartedAt()?.toISOString() || null,
          endedAt: savedStudySession.getEndedAt()?.toISOString() || null,
          createdAt: savedStudySession.getCreatedAt().toISOString()
        },
        message: 'Study session created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create study session: ${error.message}`);
    }
  }
} 