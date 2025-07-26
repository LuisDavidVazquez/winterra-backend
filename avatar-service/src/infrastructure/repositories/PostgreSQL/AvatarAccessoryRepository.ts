import { Repository } from 'typeorm';
import { AvatarAccessoryEntity } from '../../../domain/entities/AvatarAccessoryEntity';
import { AvatarAccessoryRepository as IAvatarAccessoryRepository } from '../../../domain/repositories/AvatarAccessoryRepository';
import { AvatarAccessoryModel } from '../../models/AvatarAccessoryModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLAvatarAccessoryRepository implements IAvatarAccessoryRepository {
  private get repository(): Repository<AvatarAccessoryModel> {
    return AppDataSource.getRepository(AvatarAccessoryModel);
  }

  async save(avatarAccessory: AvatarAccessoryEntity): Promise<AvatarAccessoryEntity> {
    const model = new AvatarAccessoryModel();
    model.id = avatarAccessory.getId();
    model.userId = avatarAccessory.getUserId();
    model.accessoryId = avatarAccessory.getAccessoryId();
    model.isEquipped = avatarAccessory.getIsEquipped();
    model.unlockedAt = avatarAccessory.getUnlockedAt();

    const savedModel = await this.repository.save(model);

    return new AvatarAccessoryEntity(
      savedModel.id,
      savedModel.userId,
      savedModel.accessoryId,
      savedModel.isEquipped,
      savedModel.unlockedAt
    );
  }

  async findById(id: string): Promise<AvatarAccessoryEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new AvatarAccessoryEntity(
      model.id,
      model.userId,
      model.accessoryId,
      model.isEquipped,
      model.unlockedAt
    );
  }

  async findByUserId(userId: string): Promise<AvatarAccessoryEntity[]> {
    const models = await this.repository.find({ where: { userId } });
    
    return models.map(model => new AvatarAccessoryEntity(
      model.id,
      model.userId,
      model.accessoryId,
      model.isEquipped,
      model.unlockedAt
    ));
  }

  async findByUserIdAndAccessoryId(userId: string, accessoryId: string): Promise<AvatarAccessoryEntity | null> {
    const model = await this.repository.findOne({ 
      where: { userId, accessoryId } 
    });
    
    if (!model) {
      return null;
    }

    return new AvatarAccessoryEntity(
      model.id,
      model.userId,
      model.accessoryId,
      model.isEquipped,
      model.unlockedAt
    );
  }

  async findEquippedByUserId(userId: string): Promise<AvatarAccessoryEntity[]> {
    const models = await this.repository.find({ 
      where: { userId, isEquipped: true } 
    });
    
    return models.map(model => new AvatarAccessoryEntity(
      model.id,
      model.userId,
      model.accessoryId,
      model.isEquipped,
      model.unlockedAt
    ));
  }

  async update(avatarAccessory: AvatarAccessoryEntity): Promise<AvatarAccessoryEntity> {
    const model = await this.repository.findOne({ where: { id: avatarAccessory.getId() } });
    
    if (!model) {
      throw new Error('Avatar accessory not found');
    }

    model.userId = avatarAccessory.getUserId();
    model.accessoryId = avatarAccessory.getAccessoryId();
    model.isEquipped = avatarAccessory.getIsEquipped();
    model.unlockedAt = avatarAccessory.getUnlockedAt();

    const updatedModel = await this.repository.save(model);

    return new AvatarAccessoryEntity(
      updatedModel.id,
      updatedModel.userId,
      updatedModel.accessoryId,
      updatedModel.isEquipped,
      updatedModel.unlockedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async existsByUserIdAndAccessoryId(userId: string, accessoryId: string): Promise<boolean> {
    const count = await this.repository.count({ 
      where: { userId, accessoryId } 
    });
    return count > 0;
  }

  async unequipAllByType(userId: string, type: number): Promise<void> {
    // This is a complex query that requires joining with accessories table
    // For now, we'll implement a simpler approach by unequipping all accessories
    // and then re-equipping the one we want
    await this.repository
      .createQueryBuilder()
      .update(AvatarAccessoryModel)
      .set({ isEquipped: false })
      .where('userId = :userId', { userId })
      .execute();
  }
} 