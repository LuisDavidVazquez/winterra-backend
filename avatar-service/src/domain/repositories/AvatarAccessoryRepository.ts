import { AvatarAccessoryEntity } from '../entities/AvatarAccessoryEntity';

export interface AvatarAccessoryRepository {
  save(avatarAccessory: AvatarAccessoryEntity): Promise<AvatarAccessoryEntity>;
  findById(id: string): Promise<AvatarAccessoryEntity | null>;
  findByUserId(userId: string): Promise<AvatarAccessoryEntity[]>;
  findByUserIdAndAccessoryId(userId: string, accessoryId: string): Promise<AvatarAccessoryEntity | null>;
  findEquippedByUserId(userId: string): Promise<AvatarAccessoryEntity[]>;
  update(avatarAccessory: AvatarAccessoryEntity): Promise<AvatarAccessoryEntity>;
  delete(id: string): Promise<void>;
  existsByUserIdAndAccessoryId(userId: string, accessoryId: string): Promise<boolean>;
  unequipAllByType(userId: string, type: number): Promise<void>;
} 