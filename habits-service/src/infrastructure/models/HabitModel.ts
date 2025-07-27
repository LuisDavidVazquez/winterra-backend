import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('habits')
export class HabitModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('int', { name: 'habit_type' })
  habitType: number;

  @Column('int', { name: 'habit_category' })
  habitCategory: number;

  @Column('text', { nullable: true })
  description: string | null;
} 