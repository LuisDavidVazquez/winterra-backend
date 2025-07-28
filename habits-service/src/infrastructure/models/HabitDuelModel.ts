import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { HabitDuelEntity, DuelStatus } from '../../domain/entities/HabitDuelEntity';

@Entity('habit_duels')
export class HabitDuelModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  user_habit_id: string;

  @Column('uuid')
  challenger_id: string;

  @Column('uuid')
  opponent_id: string;

  @Column('int')
  streak_challenger: number;

  @Column('int')
  streak_opponent: number;

  @Column('varchar', { length: 20 })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('timestamp', { nullable: true })
  completed_at: Date | null;

  static fromDomain(habitDuel: HabitDuelEntity): HabitDuelModel {
    const model = new HabitDuelModel();
    model.id = habitDuel.getId();
    model.user_habit_id = habitDuel.getUserHabitId();
    model.challenger_id = habitDuel.getChallengerId();
    model.opponent_id = habitDuel.getOpponentId();
    model.streak_challenger = habitDuel.getStreakChallenger();
    model.streak_opponent = habitDuel.getStreakOpponent();
    model.status = habitDuel.getStatus();
    model.created_at = habitDuel.getCreatedAt();
    model.completed_at = habitDuel.getCompletedAt();
    return model;
  }

  toDomain(): HabitDuelEntity {
    return new HabitDuelEntity(
      this.id,
      this.user_habit_id,
      this.challenger_id,
      this.opponent_id,
      this.streak_challenger,
      this.streak_opponent,
      this.status as DuelStatus,
      this.created_at,
      this.completed_at
    );
  }
} 