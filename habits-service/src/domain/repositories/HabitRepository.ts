import { HabitEntity } from '../entities/HabitEntity';

export interface HabitRepository {
  save(habit: HabitEntity): Promise<HabitEntity>;
  findById(id: string): Promise<HabitEntity | null>;
  findByName(name: string): Promise<HabitEntity | null>;
  findAll(): Promise<HabitEntity[]>;
  findByCategoryId(categoryId: number): Promise<HabitEntity[]>;
  update(habit: HabitEntity): Promise<HabitEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
} 