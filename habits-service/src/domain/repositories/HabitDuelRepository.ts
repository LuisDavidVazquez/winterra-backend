import { HabitDuelEntity, DuelStatus } from '../entities/HabitDuelEntity';

export interface HabitDuelRepository {
  save(habitDuel: HabitDuelEntity): Promise<HabitDuelEntity>;
  findById(id: string): Promise<HabitDuelEntity | null>;
  findByUserHabitId(userHabitId: string): Promise<HabitDuelEntity[]>;
  findByChallengerId(challengerId: string): Promise<HabitDuelEntity[]>;
  findByOpponentId(opponentId: string): Promise<HabitDuelEntity[]>;
  findByStatus(status: DuelStatus): Promise<HabitDuelEntity[]>;
  findByUserHabitIdAndStatus(userHabitId: string, status: DuelStatus): Promise<HabitDuelEntity[]>;
  findByChallengerIdAndStatus(challengerId: string, status: DuelStatus): Promise<HabitDuelEntity[]>;
  findByOpponentIdAndStatus(opponentId: string, status: DuelStatus): Promise<HabitDuelEntity[]>;
  findActiveDuels(): Promise<HabitDuelEntity[]>;
  findCompletedDuels(): Promise<HabitDuelEntity[]>;
  findPendingDuels(): Promise<HabitDuelEntity[]>;
  findAll(): Promise<HabitDuelEntity[]>;
  update(habitDuel: HabitDuelEntity): Promise<HabitDuelEntity>;
  delete(id: string): Promise<void>;
  findDuelsByUserId(userId: string): Promise<HabitDuelEntity[]>;
  findActiveDuelsByUserId(userId: string): Promise<HabitDuelEntity[]>;
  findCompletedDuelsByUserId(userId: string): Promise<HabitDuelEntity[]>;
  findPendingDuelsByUserId(userId: string): Promise<HabitDuelEntity[]>;
} 