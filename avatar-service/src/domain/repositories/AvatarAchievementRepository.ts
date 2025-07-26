import { AvatarAchievementEntity } from '../entities/AvatarAchievementEntity';

export interface AvatarAchievementRepository {
  save(avatarAchievement: AvatarAchievementEntity): Promise<AvatarAchievementEntity>;
  findById(id: string): Promise<AvatarAchievementEntity | null>;
  findByUserId(userId: string): Promise<AvatarAchievementEntity[]>;
  findByUserIdAndAchievementId(userId: string, achievementId: string): Promise<AvatarAchievementEntity | null>;
  update(avatarAchievement: AvatarAchievementEntity): Promise<AvatarAchievementEntity>;
  delete(id: string): Promise<void>;
  existsByUserIdAndAchievementId(userId: string, achievementId: string): Promise<boolean>;
  getRecentAchievements(userId: string, daysThreshold: number): Promise<AvatarAchievementEntity[]>;
} 