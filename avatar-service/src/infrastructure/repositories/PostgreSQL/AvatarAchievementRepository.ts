import { Repository } from 'typeorm';
import { AvatarAchievementEntity } from '../../../domain/entities/AvatarAchievementEntity';
import { AvatarAchievementRepository as IAvatarAchievementRepository } from '../../../domain/repositories/AvatarAchievementRepository';
import { AvatarAchievementModel } from '../../models/AvatarAchievementModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLAvatarAchievementRepository implements IAvatarAchievementRepository {
  private get repository(): Repository<AvatarAchievementModel> {
    return AppDataSource.getRepository(AvatarAchievementModel);
  }

  async save(avatarAchievement: AvatarAchievementEntity): Promise<AvatarAchievementEntity> {
    const model = new AvatarAchievementModel();
    model.id = avatarAchievement.getId();
    model.userId = avatarAchievement.getUserId();
    model.achievementId = avatarAchievement.getAchievementId();
    model.unlockedAt = avatarAchievement.getUnlockedAt();

    const savedModel = await this.repository.save(model);

    return new AvatarAchievementEntity(
      savedModel.id,
      savedModel.userId,
      savedModel.achievementId,
      savedModel.unlockedAt
    );
  }

  async findById(id: string): Promise<AvatarAchievementEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new AvatarAchievementEntity(
      model.id,
      model.userId,
      model.achievementId,
      model.unlockedAt
    );
  }

  async findByUserId(userId: string): Promise<AvatarAchievementEntity[]> {
    const models = await this.repository.find({ where: { userId } });
    
    return models.map(model => new AvatarAchievementEntity(
      model.id,
      model.userId,
      model.achievementId,
      model.unlockedAt
    ));
  }

  async findByUserIdAndAchievementId(userId: string, achievementId: string): Promise<AvatarAchievementEntity | null> {
    const model = await this.repository.findOne({ 
      where: { userId, achievementId } 
    });
    
    if (!model) {
      return null;
    }

    return new AvatarAchievementEntity(
      model.id,
      model.userId,
      model.achievementId,
      model.unlockedAt
    );
  }

  async update(avatarAchievement: AvatarAchievementEntity): Promise<AvatarAchievementEntity> {
    const model = await this.repository.findOne({ where: { id: avatarAchievement.getId() } });
    
    if (!model) {
      throw new Error('Avatar achievement not found');
    }

    model.userId = avatarAchievement.getUserId();
    model.achievementId = avatarAchievement.getAchievementId();
    model.unlockedAt = avatarAchievement.getUnlockedAt();

    const updatedModel = await this.repository.save(model);

    return new AvatarAchievementEntity(
      updatedModel.id,
      updatedModel.userId,
      updatedModel.achievementId,
      updatedModel.unlockedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async existsByUserIdAndAchievementId(userId: string, achievementId: string): Promise<boolean> {
    const count = await this.repository.count({ 
      where: { userId, achievementId } 
    });
    return count > 0;
  }

  async getRecentAchievements(userId: string, daysThreshold: number): Promise<AvatarAchievementEntity[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysThreshold);

    const models = await this.repository
      .createQueryBuilder('avatar_achievement')
      .where('avatar_achievement.userId = :userId', { userId })
      .andWhere('avatar_achievement.unlockedAt >= :cutoffDate', { cutoffDate })
      .orderBy('avatar_achievement.unlockedAt', 'DESC')
      .getMany();

    return models.map(model => new AvatarAchievementEntity(
      model.id,
      model.userId,
      model.achievementId,
      model.unlockedAt
    ));
  }
} 