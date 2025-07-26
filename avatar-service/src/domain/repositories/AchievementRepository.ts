import { AchievementEntity } from '../entities/AchievementEntity';

export interface AchievementRepository {
  save(achievement: AchievementEntity): Promise<AchievementEntity>;
  findById(id: string): Promise<AchievementEntity | null>;
  findAll(): Promise<AchievementEntity[]>;
  update(achievement: AchievementEntity): Promise<AchievementEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
} 