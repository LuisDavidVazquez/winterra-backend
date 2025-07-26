import { AvatarEntity } from '../entities/AvatarEntity';

export interface AvatarRepository {
  save(avatar: AvatarEntity): Promise<AvatarEntity>;
  findById(id: string): Promise<AvatarEntity | null>;
  findByUserId(userId: string): Promise<AvatarEntity | null>;
  findAll(): Promise<AvatarEntity[]>;
  update(avatar: AvatarEntity): Promise<AvatarEntity>;
  delete(id: string): Promise<void>;
  existsByUserId(userId: string): Promise<boolean>;
} 