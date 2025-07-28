import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../config/db/database';
import { UserMissionModel } from '../../models/UserMissionModel';
import { UserMissionEntity } from '../../../domain/entities/UserMissionEntity';
import { UserMissionRepository as IUserMissionRepository } from '../../../domain/repositories/UserMissionRepository';

export class PostgreSQLUserMissionRepository implements IUserMissionRepository {
  private repository: Repository<UserMissionModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserMissionModel);
  }

  async save(userMission: UserMissionEntity): Promise<UserMissionEntity> {
    const userMissionModel = UserMissionModel.fromDomain(userMission);
    const savedModel = await this.repository.save(userMissionModel);
    return savedModel.toDomain();
  }

  async findById(id: string): Promise<UserMissionEntity | null> {
    const userMissionModel = await this.repository.findOne({ where: { id } });
    return userMissionModel ? userMissionModel.toDomain() : null;
  }

  async findByUserHabitsId(userHabitsId: string): Promise<UserMissionEntity[]> {
    const userMissionModels = await this.repository.find({ where: { user_habits_id: userHabitsId } });
    return userMissionModels.map(model => model.toDomain());
  }

  async findByMissionId(missionId: string): Promise<UserMissionEntity[]> {
    const userMissionModels = await this.repository.find({ where: { mission_id: missionId } });
    return userMissionModels.map(model => model.toDomain());
  }

  async findByStatus(status: string): Promise<UserMissionEntity[]> {
    const userMissionModels = await this.repository.find({ where: { status } });
    return userMissionModels.map(model => model.toDomain());
  }

  async findAll(): Promise<UserMissionEntity[]> {
    const userMissionModels = await this.repository.find();
    return userMissionModels.map(model => model.toDomain());
  }

  async update(userMission: UserMissionEntity): Promise<UserMissionEntity> {
    const userMissionModel = UserMissionModel.fromDomain(userMission);
    const updatedModel = await this.repository.save(userMissionModel);
    return updatedModel.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByUserHabitsId(userHabitsId: string): Promise<void> {
    await this.repository.delete({ user_habits_id: userHabitsId });
  }

  async findByUserHabitsIdAndStatus(userHabitsId: string, status: string): Promise<UserMissionEntity[]> {
    const userMissionModels = await this.repository.find({ 
      where: { 
        user_habits_id: userHabitsId,
        status 
      } 
    });
    return userMissionModels.map(model => model.toDomain());
  }

  async findCompletedByUserHabitsId(userHabitsId: string): Promise<UserMissionEntity[]> {
    return this.findByUserHabitsIdAndStatus(userHabitsId, 'completed');
  }

  async findInProgressByUserHabitsId(userHabitsId: string): Promise<UserMissionEntity[]> {
    return this.findByUserHabitsIdAndStatus(userHabitsId, 'in_progress');
  }
} 