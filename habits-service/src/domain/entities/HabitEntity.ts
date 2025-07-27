import { HabitName } from '../value-objects/HabitName';
import { HabitCategoryId } from '../value-objects/HabitCategoryId';

export class HabitEntity {
  private readonly id: string;
  private name: HabitName;
  private categoryId: HabitCategoryId;
  private description: string | null;

  constructor(
    id: string,
    name: string,
    categoryId: number,
    description: string | null = null
  ) {
    this.id = id;
    this.name = new HabitName(name);
    this.categoryId = new HabitCategoryId(categoryId);
    this.description = description;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): HabitName {
    return this.name;
  }

  getCategoryId(): HabitCategoryId {
    return this.categoryId;
  }

  getDescription(): string | null {
    return this.description;
  }

  // Business methods
  updateName(name: string): void {
    this.name = new HabitName(name);
  }

  updateCategory(categoryId: number): void {
    this.categoryId = new HabitCategoryId(categoryId);
  }

  updateDescription(description: string | null): void {
    this.description = description;
  }

  // Validation methods
  isValid(): boolean {
    return this.id.length > 0 && this.name.getValue().length > 0;
  }
} 