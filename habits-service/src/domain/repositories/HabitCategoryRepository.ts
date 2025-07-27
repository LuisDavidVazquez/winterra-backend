import { HabitCategoryEntity } from '../entities/HabitCategoryEntity';

export interface HabitCategoryRepository {
  save(habitCategory: HabitCategoryEntity): Promise<HabitCategoryEntity>;
  findById(id: number): Promise<HabitCategoryEntity | null>;
  findAll(): Promise<HabitCategoryEntity[]>;
  update(habitCategory: HabitCategoryEntity): Promise<HabitCategoryEntity>;
  delete(id: number): Promise<void>;
  existsById(id: number): Promise<boolean>;
} 