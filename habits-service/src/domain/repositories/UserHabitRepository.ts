import { UserHabitEntity } from '../entities/UserHabitEntity';

export interface UserHabitRepository {
  save(userHabit: UserHabitEntity): Promise<UserHabitEntity>;
  findById(id: string): Promise<UserHabitEntity | null>;
  findByUserId(userId: string): Promise<UserHabitEntity[]>;
  findByHabitId(habitId: string): Promise<UserHabitEntity[]>;
  findCustomHabitsByUserId(userId: string): Promise<UserHabitEntity[]>;
  findSystemHabitsByUserId(userId: string): Promise<UserHabitEntity[]>;
  update(userHabit: UserHabitEntity): Promise<UserHabitEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
} 