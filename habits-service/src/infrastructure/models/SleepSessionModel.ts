import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('sleep_sessions')
export class SleepSessionModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_habit_id' })
  userHabitId: string;

  @Column('time', { name: 'sleep_time' })
  sleepTime: string;

  @Column('time', { name: 'wake_up_time' })
  wakeUpTime: string;

  @Column('numeric', { precision: 4, scale: 2, name: 'total_hours', nullable: true })
  totalHours: number | null;

  @Column('varchar', { length: 20, name: 'sleep_quality', nullable: true })
  sleepQuality: string | null;

  @Column('text', { nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 