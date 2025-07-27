import { HabitTypeEntity } from '../entities/HabitTypeEntity';

export interface HabitTypeRepository {
  save(habitType: HabitTypeEntity): Promise<HabitTypeEntity>;
  findById(id: number): Promise<HabitTypeEntity | null>;
  findAll(): Promise<HabitTypeEntity[]>;
  update(habitType: HabitTypeEntity): Promise<HabitTypeEntity>;
  delete(id: number): Promise<void>;
  existsById(id: number): Promise<boolean>;
} 