import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('habits')
export class HabitModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 100, unique: true })
  name: string;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @Column('varchar', { length: 500, nullable: true })
  description: string | null;
} 