import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('reactions')
export class ReactionModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'post_id' })
  postId: string;

  @CreateDateColumn({ name: 'reacted_at' })
  reactedAt: Date;
} 