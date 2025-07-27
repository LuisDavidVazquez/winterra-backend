import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('habit_categories')
export class HabitCategoryModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 20, nullable: true })
  color: string | null;
} 