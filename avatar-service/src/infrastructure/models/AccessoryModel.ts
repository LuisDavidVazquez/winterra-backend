import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('accessories')
export class AccessoryModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('int')
  type: number;

  @Column('int')
  price: number;

  @Column('int')
  rarity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 