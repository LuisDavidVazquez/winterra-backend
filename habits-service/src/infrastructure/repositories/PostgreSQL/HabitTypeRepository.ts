import { Repository } from 'typeorm';
import { HabitTypeEntity } from '../../../domain/entities/HabitTypeEntity';
import { HabitTypeRepository as IHabitTypeRepository } from '../../../domain/repositories/HabitTypeRepository';
import { HabitTypeModel } from '../../models/HabitTypeModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLHabitTypeRepository implements IHabitTypeRepository {
  private get repository(): Repository<HabitTypeModel> {
    return AppDataSource.getRepository(HabitTypeModel);
  }

  async save(habitType: HabitTypeEntity): Promise<HabitTypeEntity> {
    const model = new HabitTypeModel();
    model.id = habitType.getId().getValue();
    model.name = habitType.getName();
    model.description = habitType.getDescription();

    const savedModel = await this.repository.save(model);

    return new HabitTypeEntity(
      savedModel.id,
      savedModel.name,
      savedModel.description
    );
  }

  async findById(id: number): Promise<HabitTypeEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new HabitTypeEntity(
      model.id,
      model.name,
      model.description
    );
  }

  async findAll(): Promise<HabitTypeEntity[]> {
    const models = await this.repository.find();
    
    return models.map(model => new HabitTypeEntity(
      model.id,
      model.name,
      model.description
    ));
  }

  async update(habitType: HabitTypeEntity): Promise<HabitTypeEntity> {
    const model = await this.repository.findOne({ where: { id: habitType.getId().getValue() } });
    
    if (!model) {
      throw new Error('Habit type not found');
    }

    model.name = habitType.getName();
    model.description = habitType.getDescription();

    const updatedModel = await this.repository.save(model);

    return new HabitTypeEntity(
      updatedModel.id,
      updatedModel.name,
      updatedModel.description
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