import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('friendships')
export class FriendshipModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  friend_id: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    default: 'PENDING'
  })
  status: string;

  @Column('boolean', { default: false })
  is_best_friend: boolean;

  @CreateDateColumn()
  created_at: Date;
} 