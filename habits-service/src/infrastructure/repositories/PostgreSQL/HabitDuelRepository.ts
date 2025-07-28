import { Repository } from 'typeorm';
import { HabitDuelRepository as IHabitDuelRepository } from '../../../domain/repositories/HabitDuelRepository';
import { HabitDuelEntity, DuelStatus } from '../../../domain/entities/HabitDuelEntity';
import { HabitDuelModel } from '../../models/HabitDuelModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLHabitDuelRepository implements IHabitDuelRepository {
  private repository: Repository<HabitDuelModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(HabitDuelModel);
  }

  async save(habitDuel: HabitDuelEntity): Promise<HabitDuelEntity> {
    const model = HabitDuelModel.fromDomain(habitDuel);
    const savedModel = await this.repository.save(model);
    return savedModel.toDomain();
  }

  async findById(id: string): Promise<HabitDuelEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    return model ? model.toDomain() : null;
  }

  async findByUserHabitId(userHabitId: string): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ where: { user_habit_id: userHabitId } });
    return models.map(model => model.toDomain());
  }

  async findByChallengerId(challengerId: string): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ where: { challenger_id: challengerId } });
    return models.map(model => model.toDomain());
  }

  async findByOpponentId(opponentId: string): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ where: { opponent_id: opponentId } });
    return models.map(model => model.toDomain());
  }

  async findByStatus(status: DuelStatus): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ where: { status } });
    return models.map(model => model.toDomain());
  }

  async findByUserHabitIdAndStatus(userHabitId: string, status: DuelStatus): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ 
      where: { user_habit_id: userHabitId, status } 
    });
    return models.map(model => model.toDomain());
  }

  async findByChallengerIdAndStatus(challengerId: string, status: DuelStatus): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ 
      where: { challenger_id: challengerId, status } 
    });
    return models.map(model => model.toDomain());
  }

  async findByOpponentIdAndStatus(opponentId: string, status: DuelStatus): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ 
      where: { opponent_id: opponentId, status } 
    });
    return models.map(model => model.toDomain());
  }

  async findActiveDuels(): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ where: { status: DuelStatus.ACCEPTED } });
    return models.map(model => model.toDomain());
  }

  async findCompletedDuels(): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ where: { status: DuelStatus.COMPLETED } });
    return models.map(model => model.toDomain());
  }

  async findPendingDuels(): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({ where: { status: DuelStatus.PENDING } });
    return models.map(model => model.toDomain());
  }

  async findAll(): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find();
    return models.map(model => model.toDomain());
  }

  async update(habitDuel: HabitDuelEntity): Promise<HabitDuelEntity> {
    const model = HabitDuelModel.fromDomain(habitDuel);
    const updatedModel = await this.repository.save(model);
    return updatedModel.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findDuelsByUserId(userId: string): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({
      where: [
        { challenger_id: userId },
        { opponent_id: userId }
      ]
    });
    return models.map(model => model.toDomain());
  }

  async findActiveDuelsByUserId(userId: string): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({
      where: [
        { challenger_id: userId, status: DuelStatus.ACCEPTED },
        { opponent_id: userId, status: DuelStatus.ACCEPTED }
      ]
    });
    return models.map(model => model.toDomain());
  }

  async findCompletedDuelsByUserId(userId: string): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({
      where: [
        { challenger_id: userId, status: DuelStatus.COMPLETED },
        { opponent_id: userId, status: DuelStatus.COMPLETED }
      ]
    });
    return models.map(model => model.toDomain());
  }

  async findPendingDuelsByUserId(userId: string): Promise<HabitDuelEntity[]> {
    const models = await this.repository.find({
      where: [
        { challenger_id: userId, status: DuelStatus.PENDING },
        { opponent_id: userId, status: DuelStatus.PENDING }
      ]
    });
    return models.map(model => model.toDomain());
  }
} 