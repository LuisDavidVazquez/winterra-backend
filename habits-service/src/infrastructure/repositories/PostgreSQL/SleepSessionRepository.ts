import { Repository } from 'typeorm';
import { SleepSessionEntity } from '../../../domain/entities/SleepSessionEntity';
import { SleepSessionRepository as ISleepSessionRepository } from '../../../domain/repositories/SleepSessionRepository';
import { SleepSessionModel } from '../../models/SleepSessionModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLSleepSessionRepository implements ISleepSessionRepository {
  private get repository(): Repository<SleepSessionModel> {
    return AppDataSource.getRepository(SleepSessionModel);
  }

  async save(sleepSession: SleepSessionEntity): Promise<SleepSessionEntity> {
    const model = new SleepSessionModel();
    model.id = sleepSession.getId();
    model.userHabitId = sleepSession.getUserHabitId();
    model.sleepTime = sleepSession.getSleepTime().toTimeString().slice(0, 8);
    model.wakeUpTime = sleepSession.getWakeUpTime().toTimeString().slice(0, 8);
    model.totalHours = sleepSession.getTotalHours();
    model.sleepQuality = sleepSession.getSleepQuality()?.getValue() || null;
    model.notes = sleepSession.getNotes();
    model.createdAt = sleepSession.getCreatedAt();

    const savedModel = await this.repository.save(model);

    // Convertir strings de tiempo a Date objects
    const sleepTime = new Date();
    const [sleepHours, sleepMinutes] = savedModel.sleepTime.split(':');
    sleepTime.setHours(parseInt(sleepHours), parseInt(sleepMinutes), 0, 0);

    const wakeUpTime = new Date();
    const [wakeHours, wakeMinutes] = savedModel.wakeUpTime.split(':');
    wakeUpTime.setHours(parseInt(wakeHours), parseInt(wakeMinutes), 0, 0);

    return new SleepSessionEntity(
      savedModel.id,
      savedModel.userHabitId,
      sleepTime,
      wakeUpTime,
      savedModel.totalHours,
      savedModel.sleepQuality,
      savedModel.notes,
      savedModel.createdAt
    );
  }

  async findById(id: string): Promise<SleepSessionEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    // Convertir strings de tiempo a Date objects
    const sleepTime = new Date();
    const [sleepHours, sleepMinutes] = model.sleepTime.split(':');
    sleepTime.setHours(parseInt(sleepHours), parseInt(sleepMinutes), 0, 0);

    const wakeUpTime = new Date();
    const [wakeHours, wakeMinutes] = model.wakeUpTime.split(':');
    wakeUpTime.setHours(parseInt(wakeHours), parseInt(wakeMinutes), 0, 0);

    return new SleepSessionEntity(
      model.id,
      model.userHabitId,
      sleepTime,
      wakeUpTime,
      model.totalHours,
      model.sleepQuality,
      model.notes,
      model.createdAt
    );
  }

  async findByUserHabitId(userHabitId: string): Promise<SleepSessionEntity[]> {
    const models = await this.repository.find({ where: { userHabitId } });
    
    return models.map(model => {
      // Convertir strings de tiempo a Date objects
      const sleepTime = new Date();
      const [sleepHours, sleepMinutes] = model.sleepTime.split(':');
      sleepTime.setHours(parseInt(sleepHours), parseInt(sleepMinutes), 0, 0);

      const wakeUpTime = new Date();
      const [wakeHours, wakeMinutes] = model.wakeUpTime.split(':');
      wakeUpTime.setHours(parseInt(wakeHours), parseInt(wakeMinutes), 0, 0);

      return new SleepSessionEntity(
        model.id,
        model.userHabitId,
        sleepTime,
        wakeUpTime,
        model.totalHours,
        model.sleepQuality,
        model.notes,
        model.createdAt
      );
    });
  }

  async update(sleepSession: SleepSessionEntity): Promise<SleepSessionEntity> {
    const model = await this.repository.findOne({ where: { id: sleepSession.getId() } });
    
    if (!model) {
      throw new Error('Sleep session not found');
    }

    model.sleepTime = sleepSession.getSleepTime().toTimeString().slice(0, 8);
    model.wakeUpTime = sleepSession.getWakeUpTime().toTimeString().slice(0, 8);
    model.totalHours = sleepSession.getTotalHours();
    model.sleepQuality = sleepSession.getSleepQuality()?.getValue() || null;
    model.notes = sleepSession.getNotes();

    const updatedModel = await this.repository.save(model);

    // Convertir strings de tiempo a Date objects
    const sleepTime = new Date();
    const [sleepHours, sleepMinutes] = updatedModel.sleepTime.split(':');
    sleepTime.setHours(parseInt(sleepHours), parseInt(sleepMinutes), 0, 0);

    const wakeUpTime = new Date();
    const [wakeHours, wakeMinutes] = updatedModel.wakeUpTime.split(':');
    wakeUpTime.setHours(parseInt(wakeHours), parseInt(wakeMinutes), 0, 0);

    return new SleepSessionEntity(
      updatedModel.id,
      updatedModel.userHabitId,
      sleepTime,
      wakeUpTime,
      updatedModel.totalHours,
      updatedModel.sleepQuality,
      updatedModel.notes,
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