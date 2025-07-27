import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('achievements')
export class AchievementModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 500 })
  description: string;

  @Column('varchar', { length: 500, nullable: true })
  img: string | null;

  @Column('int', { name: 'type_id' })
  typeId: number;

  @Column('int')
  condition: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 