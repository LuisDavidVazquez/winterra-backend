import { Repository } from 'typeorm';
import { AchievementEntity } from '../../../domain/entities/AchievementEntity';
import { AchievementRepository as IAchievementRepository } from '../../../domain/repositories/AchievementRepository';
import { AchievementModel } from '../../models/AchievementModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLAchievementRepository implements IAchievementRepository {
  private get repository(): Repository<AchievementModel> {
    return AppDataSource.getRepository(AchievementModel);
  }

  async save(achievement: AchievementEntity): Promise<AchievementEntity> {
    const model = new AchievementModel();
    model.id = achievement.getId();
    model.name = achievement.getName();
    model.description = achievement.getDescription();
    model.img = achievement.getImg();
    model.createdAt = achievement.getCreatedAt();

    const savedModel = await this.repository.save(model);

    return new AchievementEntity(
      savedModel.id,
      savedModel.name,
      savedModel.description,
      savedModel.img,
      savedModel.createdAt
    );
  }

  async findById(id: string): Promise<AchievementEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new AchievementEntity(
      model.id,
      model.name,
      model.description,
      model.img,
      model.createdAt
    );
  }

  async findAll(): Promise<AchievementEntity[]> {
    const models = await this.repository.find();
    
    return models.map(model => new AchievementEntity(
      model.id,
      model.name,
      model.description,
      model.img,
      model.createdAt
    ));
  }

  async update(achievement: AchievementEntity): Promise<AchievementEntity> {
    const model = await this.repository.findOne({ where: { id: achievement.getId() } });
    
    if (!model) {
      throw new Error('Achievement not found');
    }

    model.name = achievement.getName();
    model.description = achievement.getDescription();
    model.img = achievement.getImg();

    const updatedModel = await this.repository.save(model);

    return new AchievementEntity(
      updatedModel.id,
      updatedModel.name,
      updatedModel.description,
      updatedModel.img,
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