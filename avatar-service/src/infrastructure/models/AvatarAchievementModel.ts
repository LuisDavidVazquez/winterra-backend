import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('avatar_achievements')
export class AvatarAchievementModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'achievement_id' })
  achievementId: string;

  @CreateDateColumn({ name: 'unlocked_at' })
  unlockedAt: Date;
} 