import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('avatars')
export class AvatarModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('int', { default: 0 })
  experience: number;

  @Column('int', { default: 1 })
  level: number;

  @Column('int', { default: 0 })
  coins: number;

  @Column('int', { name: 'streak_days', default: 0 })
  streakDays: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 