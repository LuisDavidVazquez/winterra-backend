import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user_habits')
export class UserHabitModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'habit_id', nullable: true })
  habitId: string | null;

  @Column('varchar', { length: 100, name: 'custom_name', nullable: true })
  customName: string | null;

  @Column('text', { name: 'custom_description', nullable: true })
  customDescription: string | null;

  @Column('varchar', { length: 7, name: 'routine_days' })
  routineDays: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 