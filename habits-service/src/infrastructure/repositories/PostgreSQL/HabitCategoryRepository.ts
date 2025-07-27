import { Repository } from 'typeorm';
import { HabitCategoryEntity } from '../../../domain/entities/HabitCategoryEntity';
import { HabitCategoryRepository as IHabitCategoryRepository } from '../../../domain/repositories/HabitCategoryRepository';
import { HabitCategoryModel } from '../../models/HabitCategoryModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLHabitCategoryRepository implements IHabitCategoryRepository {
  private get repository(): Repository<HabitCategoryModel> {
    return AppDataSource.getRepository(HabitCategoryModel);
  }

  async save(habitCategory: HabitCategoryEntity): Promise<HabitCategoryEntity> {
    const model = new HabitCategoryModel();
    model.id = habitCategory.getId().getValue();
    model.name = habitCategory.getName();
    model.color = habitCategory.getColor();

    const savedModel = await this.repository.save(model);

    return new HabitCategoryEntity(
      savedModel.id,
      savedModel.name,
      savedModel.color
    );
  }

  async findById(id: number): Promise<HabitCategoryEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new HabitCategoryEntity(
      model.id,
      model.name,
      model.color
    );
  }

  async findAll(): Promise<HabitCategoryEntity[]> {
    const models = await this.repository.find();
    
    return models.map(model => new HabitCategoryEntity(
      model.id,
      model.name,
      model.color
    ));
  }

  async update(habitCategory: HabitCategoryEntity): Promise<HabitCategoryEntity> {
    const model = await this.repository.findOne({ where: { id: habitCategory.getId().getValue() } });
    
    if (!model) {
      throw new Error('Habit category not found');
    }

    model.name = habitCategory.getName();
    model.color = habitCategory.getColor();

    const updatedModel = await this.repository.save(model);

    return new HabitCategoryEntity(
      updatedModel.id,
      updatedModel.name,
      updatedModel.color
    );
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async existsById(id: number): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }
} 