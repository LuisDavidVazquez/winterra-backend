import { SleepSessionEntity } from '../entities/SleepSessionEntity';

export interface SleepSessionRepository {
  save(sleepSession: SleepSessionEntity): Promise<SleepSessionEntity>;
  findById(id: string): Promise<SleepSessionEntity | null>;
  findByUserHabitId(userHabitId: string): Promise<SleepSessionEntity[]>;
  update(sleepSession: SleepSessionEntity): Promise<SleepSessionEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
} 