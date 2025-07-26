import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('avatar_accessories')
export class AvatarAccessoryModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'accessory_id' })
  accessoryId: string;

  @Column('boolean', { name: 'is_equipped' })
  isEquipped: boolean;

  @CreateDateColumn({ name: 'unlocked_at' })
  unlockedAt: Date;
} 