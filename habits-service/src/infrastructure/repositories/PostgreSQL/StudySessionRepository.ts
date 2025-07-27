import { Repository } from 'typeorm';
import { StudySessionEntity } from '../../../domain/entities/StudySessionEntity';
import { StudySessionRepository as IStudySessionRepository } from '../../../domain/repositories/StudySessionRepository';
import { StudySessionModel } from '../../models/StudySessionModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLStudySessionRepository implements IStudySessionRepository {
  private get repository(): Repository<StudySessionModel> {
    return AppDataSource.getRepository(StudySessionModel);
  }

  async save(studySession: StudySessionEntity): Promise<StudySessionEntity> {
    const model = new StudySessionModel();
    model.id = studySession.getId();
    model.userHabitId = studySession.getUserHabitId();
    model.subject = studySession.getSubject();
    model.topic = studySession.getTopic();
    model.focusLevel = studySession.getFocusLevel()?.getValue() || null;
    model.notes = studySession.getNotes();
    model.durationMinutes = studySession.getDurationMinutes();
    model.startedAt = studySession.getStartedAt();
    model.endedAt = studySession.getEndedAt();
    model.createdAt = studySession.getCreatedAt();

    const savedModel = await this.repository.save(model);

    return new StudySessionEntity(
      savedModel.id,
      savedModel.userHabitId,
      savedModel.subject,
      savedModel.topic,
      savedModel.focusLevel,
      savedModel.notes,
      savedModel.durationMinutes,
      savedModel.startedAt,
      savedModel.endedAt,
      savedModel.createdAt
    );
  }

  async findById(id: string): Promise<StudySessionEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new StudySessionEntity(
      model.id,
      model.userHabitId,
      model.subject,
      model.topic,
      model.focusLevel,
      model.notes,
      model.durationMinutes,
      model.startedAt,
      model.endedAt,
      model.createdAt
    );
  }

  async findByUserHabitId(userHabitId: string): Promise<StudySessionEntity[]> {
    const models = await this.repository.find({ where: { userHabitId } });
    
    return models.map(model => new StudySessionEntity(
      model.id,
      model.userHabitId,
      model.subject,
      model.topic,
      model.focusLevel,
      model.notes,
      model.durationMinutes,
      model.startedAt,
      model.endedAt,
      model.createdAt
    ));
  }

  async update(studySession: StudySessionEntity): Promise<StudySessionEntity> {
    const model = await this.repository.findOne({ where: { id: studySession.getId() } });
    
    if (!model) {
      throw new Error('Study session not found');
    }

    model.subject = studySession.getSubject();
    model.topic = studySession.getTopic();
    model.focusLevel = studySession.getFocusLevel()?.getValue() || null;
    model.notes = studySession.getNotes();
    model.durationMinutes = studySession.getDurationMinutes();
    model.startedAt = studySession.getStartedAt();
    model.endedAt = studySession.getEndedAt();

    const updatedModel = await this.repository.save(model);

    return new StudySessionEntity(
      updatedModel.id,
      updatedModel.userHabitId,
      updatedModel.subject,
      updatedModel.topic,
      updatedModel.focusLevel,
      updatedModel.notes,
      updatedModel.durationMinutes,
      updatedModel.startedAt,
      updatedModel.endedAt,
      updatedModel.createdAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }
} 