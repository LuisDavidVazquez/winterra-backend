import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../config/db/database';
import { MissionModel } from '../../models/MissionModel';
import { MissionEntity } from '../../../domain/entities/MissionEntity';
import { MissionRepository as IMissionRepository } from '../../../domain/repositories/MissionRepository';

export class PostgreSQLMissionRepository implements IMissionRepository {
  private repository: Repository<MissionModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(MissionModel);
  }

  async save(mission: MissionEntity): Promise<MissionEntity> {
    const missionModel = MissionModel.fromDomain(mission);
    const savedModel = await this.repository.save(missionModel);
    return savedModel.toDomain();
  }

  async findById(id: string): Promise<MissionEntity | null> {
    const missionModel = await this.repository.findOne({ where: { id } });
    return missionModel ? missionModel.toDomain() : null;
  }

  async findByHabitId(habitId: number): Promise<MissionEntity[]> {
    const missionModels = await this.repository.find({ where: { habit_id: habitId } });
    return missionModels.map(model => model.toDomain());
  }

  async findAll(): Promise<MissionEntity[]> {
    const missionModels = await this.repository.find();
    return missionModels.map(model => model.toDomain());
  }

  async update(mission: MissionEntity): Promise<MissionEntity> {
    const missionModel = MissionModel.fromDomain(mission);
    const updatedModel = await this.repository.save(missionModel);
    return updatedModel.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByDifficultyLevel(difficultyLevel: string): Promise<MissionEntity[]> {
    const missionModels = await this.repository.find({ where: { difficulty_level: difficultyLevel } });
    return missionModels.map(model => model.toDomain());
  }

  async findByCreatedBySystem(createdBySystem: boolean): Promise<MissionEntity[]> {
    const missionModels = await this.repository.find({ where: { created_by_system: createdBySystem } });
    return missionModels.map(model => model.toDomain());
  }
} 