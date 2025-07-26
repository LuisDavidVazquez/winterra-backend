import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('comments')
export class CommentModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'post_id' })
  postId: string;

  @Column('varchar', { length: 500 })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 