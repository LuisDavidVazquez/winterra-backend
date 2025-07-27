import { HabitTypeId } from '../value-objects/HabitTypeId';
import { HabitCategoryId } from '../value-objects/HabitCategoryId';

export class HabitEntity {
  private readonly id: string;
  private habitTypeId: HabitTypeId;
  private habitCategoryId: HabitCategoryId;
  private description: string | null;

  constructor(
    id: string,
    habitTypeId: number,
    habitCategoryId: number,
    description: string | null = null
  ) {
    this.id = id;
    this.habitTypeId = new HabitTypeId(habitTypeId);
    this.habitCategoryId = new HabitCategoryId(habitCategoryId);
    this.description = description;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getHabitTypeId(): HabitTypeId {
    return this.habitTypeId;
  }

  getHabitCategoryId(): HabitCategoryId {
    return this.habitCategoryId;
  }

  getDescription(): string | null {
    return this.description;
  }

  // Business methods
  updateHabitType(habitTypeId: number): void {
    this.habitTypeId = new HabitTypeId(habitTypeId);
  }

  updateHabitCategory(habitCategoryId: number): void {
    this.habitCategoryId = new HabitCategoryId(habitCategoryId);
  }

  updateDescription(description: string | null): void {
    this.description = description;
  }

  // Validation methods
  isValid(): boolean {
    return this.id.length > 0;
  }
} 