import { Repository } from 'typeorm';
import { HabitEntity } from '../../../domain/entities/HabitEntity';
import { HabitRepository as IHabitRepository } from '../../../domain/repositories/HabitRepository';
import { HabitModel } from '../../models/HabitModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLHabitRepository implements IHabitRepository {
  private get repository(): Repository<HabitModel> {
    return AppDataSource.getRepository(HabitModel);
  }

  async save(habit: HabitEntity): Promise<HabitEntity> {
    const model = new HabitModel();
    model.id = habit.getId();
    model.habitType = habit.getHabitTypeId().getValue();
    model.habitCategory = habit.getHabitCategoryId().getValue();
    model.description = habit.getDescription();

    const savedModel = await this.repository.save(model);

    return new HabitEntity(
      savedModel.id,
      savedModel.habitType,
      savedModel.habitCategory,
      savedModel.description
    );
  }

  async findById(id: string): Promise<HabitEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new HabitEntity(
      model.id,
      model.habitType,
      model.habitCategory,
      model.description
    );
  }

  async findAll(): Promise<HabitEntity[]> {
    const models = await this.repository.find();
    
    return models.map(model => new HabitEntity(
      model.id,
      model.habitType,
      model.habitCategory,
      model.description
    ));
  }

  async findByTypeId(typeId: number): Promise<HabitEntity[]> {
    const models = await this.repository.find({ where: { habitType: typeId } });
    
    return models.map(model => new HabitEntity(
      model.id,
      model.habitType,
      model.habitCategory,
      model.description
    ));
  }

  async findByCategoryId(categoryId: number): Promise<HabitEntity[]> {
    const models = await this.repository.find({ where: { habitCategory: categoryId } });
    
    return models.map(model => new HabitEntity(
      model.id,
      model.habitType,
      model.habitCategory,
      model.description
    ));
  }

  async update(habit: HabitEntity): Promise<HabitEntity> {
    const model = await this.repository.findOne({ where: { id: habit.getId() } });
    
    if (!model) {
      throw new Error('Habit not found');
    }

    model.habitType = habit.getHabitTypeId().getValue();
    model.habitCategory = habit.getHabitCategoryId().getValue();
    model.description = habit.getDescription();

    const updatedModel = await this.repository.save(model);

    return new HabitEntity(
      updatedModel.id,
      updatedModel.habitType,
      updatedModel.habitCategory,
      updatedModel.description
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