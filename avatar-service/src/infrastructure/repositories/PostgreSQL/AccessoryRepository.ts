import { Repository } from 'typeorm';
import { AccessoryEntity } from '../../../domain/entities/AccessoryEntity';
import { AccessoryRepository as IAccessoryRepository } from '../../../domain/repositories/AccessoryRepository';
import { AccessoryModel } from '../../models/AccessoryModel';
import { AccessoryType } from '../../../domain/value-objects/AccessoryType';
import { Rarity } from '../../../domain/value-objects/Rarity';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLAccessoryRepository implements IAccessoryRepository {
  private get repository(): Repository<AccessoryModel> {
    return AppDataSource.getRepository(AccessoryModel);
  }

  async save(accessory: AccessoryEntity): Promise<AccessoryEntity> {
    const model = new AccessoryModel();
    model.id = accessory.getId();
    model.name = accessory.getName();
    model.type = accessory.getTypeValue();
    model.price = accessory.getPrice();
    model.rarity = accessory.getRarityValue();
    model.createdAt = accessory.getCreatedAt();

    const savedModel = await this.repository.save(model);

    return new AccessoryEntity(
      savedModel.id,
      savedModel.name,
      new AccessoryType(savedModel.type),
      savedModel.price,
      new Rarity(savedModel.rarity),
      savedModel.createdAt
    );
  }

  async findById(id: string): Promise<AccessoryEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new AccessoryEntity(
      model.id,
      model.name,
      new AccessoryType(model.type),
      model.price,
      new Rarity(model.rarity),
      model.createdAt
    );
  }

  async findAll(): Promise<AccessoryEntity[]> {
    const models = await this.repository.find();
    
    return models.map(model => new AccessoryEntity(
      model.id,
      model.name,
      new AccessoryType(model.type),
      model.price,
      new Rarity(model.rarity),
      model.createdAt
    ));
  }

  async findByType(type: number): Promise<AccessoryEntity[]> {
    const models = await this.repository.find({ where: { type } });
    
    return models.map(model => new AccessoryEntity(
      model.id,
      model.name,
      new AccessoryType(model.type),
      model.price,
      new Rarity(model.rarity),
      model.createdAt
    ));
  }

  async findByRarity(rarity: number): Promise<AccessoryEntity[]> {
    const models = await this.repository.find({ where: { rarity } });
    
    return models.map(model => new AccessoryEntity(
      model.id,
      model.name,
      new AccessoryType(model.type),
      model.price,
      new Rarity(model.rarity),
      model.createdAt
    ));
  }

  async update(accessory: AccessoryEntity): Promise<AccessoryEntity> {
    const model = await this.repository.findOne({ where: { id: accessory.getId() } });
    
    if (!model) {
      throw new Error('Accessory not found');
    }

    model.name = accessory.getName();
    model.type = accessory.getTypeValue();
    model.price = accessory.getPrice();
    model.rarity = accessory.getRarityValue();

    const updatedModel = await this.repository.save(model);

    return new AccessoryEntity(
      updatedModel.id,
      updatedModel.name,
      new AccessoryType(updatedModel.type),
      updatedModel.price,
      new Rarity(updatedModel.rarity),
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