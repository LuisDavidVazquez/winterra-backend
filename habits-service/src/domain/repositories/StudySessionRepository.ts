import { StudySessionEntity } from '../entities/StudySessionEntity';

export interface StudySessionRepository {
  save(studySession: StudySessionEntity): Promise<StudySessionEntity>;
  findById(id: string): Promise<StudySessionEntity | null>;
  findByUserHabitId(userHabitId: string): Promise<StudySessionEntity[]>;
  update(studySession: StudySessionEntity): Promise<StudySessionEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
} 