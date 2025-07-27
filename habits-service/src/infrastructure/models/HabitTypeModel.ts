import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('habit_types')
export class HabitTypeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('text', { nullable: true })
  description: string | null;
} 