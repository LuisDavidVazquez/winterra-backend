import { HabitCategoryId } from '../value-objects/HabitCategoryId';

export class HabitCategoryEntity {
  private readonly id: HabitCategoryId;
  private name: string;
  private color: string | null;

  constructor(
    id: number,
    name: string,
    color: string | null = null
  ) {
    this.id = new HabitCategoryId(id);
    this.name = name;
    this.color = color;
  }

  // Getters
  getId(): HabitCategoryId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getColor(): string | null {
    return this.color;
  }

  // Business methods
  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Habit category name cannot be empty');
    }
    this.name = name.trim();
  }

  updateColor(color: string | null): void {
    if (color && !this.isValidColor(color)) {
      throw new Error('Invalid color format. Use hex color (e.g., #FF0000)');
    }
    this.color = color;
  }

  // Validation methods
  isValid(): boolean {
    return this.name.trim().length > 0;
  }

  private isValidColor(color: string): boolean {
    // Validar formato de color hex
    return /^#[0-9A-F]{6}$/i.test(color);
  }
} 