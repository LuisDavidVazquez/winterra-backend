import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user_habits')
export class UserHabitModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'habit_id', nullable: true })
  habitId: string | null;

  @Column('varchar', { length: 100, name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('varchar', { length: 7, name: 'routine_days' })
  routineDays: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 