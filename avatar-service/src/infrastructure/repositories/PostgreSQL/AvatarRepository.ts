import { AvatarRepository } from '../../../domain/repositories/AvatarRepository';
import { AvatarEntity } from '../../../domain/entities/AvatarEntity';
import { AvatarModel } from '../../models/AvatarModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLAvatarRepository implements AvatarRepository {
  private get repository() {
    return AppDataSource.getRepository(AvatarModel);
  }

  async save(avatar: AvatarEntity): Promise<AvatarEntity> {
    const avatarModel = new AvatarModel();
    avatarModel.id = avatar.getId();
    avatarModel.userId = avatar.getUserId();
    avatarModel.experience = avatar.getExperienceValue();
    avatarModel.level = avatar.getLevelValue();
    avatarModel.coins = avatar.getCoinsValue();
    avatarModel.streakDays = avatar.getStreakDaysValue();
    avatarModel.createdAt = avatar.getCreatedAt();

    const savedModel = await this.repository.save(avatarModel);
    return this.mapToEntity(savedModel);
  }

  async findById(id: string): Promise<AvatarEntity | null> {
    const avatarModel = await this.repository.findOne({ where: { id } });
    return avatarModel ? this.mapToEntity(avatarModel) : null;
  }

  async findByUserId(userId: string): Promise<AvatarEntity | null> {
    const avatarModel = await this.repository.findOne({ where: { userId } });
    return avatarModel ? this.mapToEntity(avatarModel) : null;
  }

  async findAll(): Promise<AvatarEntity[]> {
    const avatarModels = await this.repository.find();
    return avatarModels.map(model => this.mapToEntity(model));
  }

  async update(avatar: AvatarEntity): Promise<AvatarEntity> {
    const avatarModel = new AvatarModel();
    avatarModel.id = avatar.getId();
    avatarModel.userId = avatar.getUserId();
    avatarModel.experience = avatar.getExperienceValue();
    avatarModel.level = avatar.getLevelValue();
    avatarModel.coins = avatar.getCoinsValue();
    avatarModel.streakDays = avatar.getStreakDaysValue();
    avatarModel.createdAt = avatar.getCreatedAt();

    const updatedModel = await this.repository.save(avatarModel);
    return this.mapToEntity(updatedModel);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async existsByUserId(userId: string): Promise<boolean> {
    const count = await this.repository.count({ where: { userId } });
    return count > 0;
  }

  private mapToEntity(model: AvatarModel): AvatarEntity {
    return new AvatarEntity(
      model.id,
      model.userId,
      model.experience,
      model.level,
      model.coins,
      model.streakDays,
      model.createdAt
    );
  }
} 