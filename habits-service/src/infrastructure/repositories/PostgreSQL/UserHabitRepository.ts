import { Repository } from 'typeorm';
import { UserHabitEntity } from '../../../domain/entities/UserHabitEntity';
import { UserHabitRepository as IUserHabitRepository } from '../../../domain/repositories/UserHabitRepository';
import { UserHabitModel } from '../../models/UserHabitModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLUserHabitRepository implements IUserHabitRepository {
  private get repository(): Repository<UserHabitModel> {
    return AppDataSource.getRepository(UserHabitModel);
  }

  async save(userHabit: UserHabitEntity): Promise<UserHabitEntity> {
    const model = new UserHabitModel();
    model.id = userHabit.getId();
    model.userId = userHabit.getUserId();
    model.habitId = userHabit.getHabitId();
    model.customName = userHabit.getCustomName();
    model.customDescription = userHabit.getCustomDescription();
    model.routineDays = userHabit.getRoutineDays().getValue();
    model.createdAt = userHabit.getCreatedAt();

    const savedModel = await this.repository.save(model);

    return new UserHabitEntity(
      savedModel.id,
      savedModel.userId,
      savedModel.habitId,
      savedModel.customName,
      savedModel.customDescription,
      savedModel.routineDays,
      savedModel.createdAt
    );
  }

  async findById(id: string): Promise<UserHabitEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new UserHabitEntity(
      model.id,
      model.userId,
      model.habitId,
      model.customName,
      model.customDescription,
      model.routineDays,
      model.createdAt
    );
  }

  async findByUserId(userId: string): Promise<UserHabitEntity[]> {
    const models = await this.repository.find({ where: { userId } });
    
    return models.map(model => new UserHabitEntity(
      model.id,
      model.userId,
      model.habitId,
      model.customName,
      model.customDescription,
      model.routineDays,
      model.createdAt
    ));
  }

  async findByHabitId(habitId: string): Promise<UserHabitEntity[]> {
    const models = await this.repository.find({ where: { habitId } });
    
    return models.map(model => new UserHabitEntity(
      model.id,
      model.userId,
      model.habitId,
      model.customName,
      model.customDescription,
      model.routineDays,
      model.createdAt
    ));
  }

  async findCustomHabitsByUserId(userId: string): Promise<UserHabitEntity[]> {
    const models = await this.repository.find({ 
      where: { 
        userId,
        habitId: null as any
      }
    });
    
    return models.map(model => new UserHabitEntity(
      model.id,
      model.userId,
      model.habitId,
      model.customName,
      model.customDescription,
      model.routineDays,
      model.createdAt
    ));
  }

  async findSystemHabitsByUserId(userId: string): Promise<UserHabitEntity[]> {
    const models = await this.repository.find({ 
      where: { 
        userId,
        habitId: null as any
      }
    });
    
    return models.map(model => new UserHabitEntity(
      model.id,
      model.userId,
      model.habitId,
      model.customName,
      model.customDescription,
      model.routineDays,
      model.createdAt
    ));
  }

  async update(userHabit: UserHabitEntity): Promise<UserHabitEntity> {
    const model = await this.repository.findOne({ where: { id: userHabit.getId() } });
    
    if (!model) {
      throw new Error('User habit not found');
    }

    model.habitId = userHabit.getHabitId();
    model.customName = userHabit.getCustomName();
    model.customDescription = userHabit.getCustomDescription();
    model.routineDays = userHabit.getRoutineDays().getValue();

    const updatedModel = await this.repository.save(model);

    return new UserHabitEntity(
      updatedModel.id,
      updatedModel.userId,
      updatedModel.habitId,
      updatedModel.customName,
      updatedModel.customDescription,
      updatedModel.routineDays,
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