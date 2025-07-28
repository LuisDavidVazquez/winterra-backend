import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { MissionEntity, DifficultyLevel } from '../../domain/entities/MissionEntity';

@Entity('missions')
export class MissionModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('int')
  habit_id: number;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 20 })
  difficulty_level: string;

  @Column('int')
  exp_reward: number;

  @Column('int')
  coin_reward: number;

  @Column('int')
  objective: number;

  @Column('boolean', { default: true })
  created_by_system: boolean;

  @CreateDateColumn()
  created_at: Date;

  static fromDomain(mission: MissionEntity): MissionModel {
    const model = new MissionModel();
    model.id = mission.getId();
    model.habit_id = mission.getHabitId();
    model.title = mission.getTitle();
    model.description = mission.getDescription();
    model.difficulty_level = mission.getDifficultyLevel();
    model.exp_reward = mission.getExpReward();
    model.coin_reward = mission.getCoinReward();
    model.objective = mission.getObjective();
    model.created_by_system = mission.isCreatedBySystem();
    model.created_at = mission.getCreatedAt();
    return model;
  }

  toDomain(): MissionEntity {
    return new MissionEntity(
      this.id,
      this.habit_id,
      this.title,
      this.description,
      this.difficulty_level as DifficultyLevel,
      this.exp_reward,
      this.coin_reward,
      this.objective,
      this.created_by_system,
      this.created_at
    );
  }
} 