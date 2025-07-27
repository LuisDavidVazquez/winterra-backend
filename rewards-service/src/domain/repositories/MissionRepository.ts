import { MissionEntity } from '../entities/MissionEntity';

export interface MissionRepository {
  save(mission: MissionEntity): Promise<MissionEntity>;
  findById(id: string): Promise<MissionEntity | null>;
  findByHabitId(habitId: number): Promise<MissionEntity[]>;
  findAll(): Promise<MissionEntity[]>;
  update(mission: MissionEntity): Promise<MissionEntity>;
  delete(id: string): Promise<void>;
  findByDifficultyLevel(difficultyLevel: string): Promise<MissionEntity[]>;
  findByCreatedBySystem(createdBySystem: boolean): Promise<MissionEntity[]>;
} 