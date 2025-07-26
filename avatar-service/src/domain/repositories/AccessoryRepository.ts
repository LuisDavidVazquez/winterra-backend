import { AccessoryEntity } from '../entities/AccessoryEntity';

export interface AccessoryRepository {
  save(accessory: AccessoryEntity): Promise<AccessoryEntity>;
  findById(id: string): Promise<AccessoryEntity | null>;
  findAll(): Promise<AccessoryEntity[]>;
  findByType(type: number): Promise<AccessoryEntity[]>;
  findByRarity(rarity: number): Promise<AccessoryEntity[]>;
  update(accessory: AccessoryEntity): Promise<AccessoryEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
} 