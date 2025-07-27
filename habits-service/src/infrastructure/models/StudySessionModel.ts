import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('study_sessions')
export class StudySessionModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_habit_id' })
  userHabitId: string;

  @Column('varchar', { length: 100, nullable: true })
  subject: string | null;

  @Column('text', { nullable: true })
  topic: string | null;

  @Column('int', { name: 'focus_level', nullable: true })
  focusLevel: number | null;

  @Column('text', { nullable: true })
  notes: string | null;

  @Column('int', { name: 'duration_minutes', nullable: true })
  durationMinutes: number | null;

  @Column('timestamp', { name: 'started_at', nullable: true })
  startedAt: Date | null;

  @Column('timestamp', { name: 'ended_at', nullable: true })
  endedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 