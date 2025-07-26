import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('encouragement_notes')
export class EncouragementNoteModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'avatar_id' })
  avatarId: string;

  @Column('varchar', { length: 1000 })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 