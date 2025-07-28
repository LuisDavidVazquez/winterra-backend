import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { UserMissionEntity, UserMissionStatus } from '../../domain/entities/UserMissionEntity';

@Entity('user_missions')
export class UserMissionModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  user_habits_id: string;

  @Column('uuid')
  mission_id: string;

  @Column('varchar', { length: 20 })
  status: string;

  @Column('int')
  progress: number;

  @CreateDateColumn()
  assigned_at: Date;

  @Column('timestamp', { nullable: true })
  completed_at: Date | null;

  static fromDomain(userMission: UserMissionEntity): UserMissionModel {
    const model = new UserMissionModel();
    model.id = userMission.getId();
    model.user_habits_id = userMission.getUserHabitsId();
    model.mission_id = userMission.getMissionId();
    model.status = userMission.getStatus();
    model.progress = userMission.getProgress();
    model.assigned_at = userMission.getAssignedAt();
    model.completed_at = userMission.getCompletedAt();
    return model;
  }

  toDomain(): UserMissionEntity {
    return new UserMissionEntity(
      this.id,
      this.user_habits_id,
      this.mission_id,
      this.status as UserMissionStatus,
      this.progress,
      this.assigned_at,
      this.completed_at
    );
  }
} 