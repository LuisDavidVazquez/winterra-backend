import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('posts')
export class PostModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('varchar', { length: 1000 })
  content: string;

  @Column('varchar', { length: 500, nullable: true, name: 'image_url' })
  imageUrl: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 