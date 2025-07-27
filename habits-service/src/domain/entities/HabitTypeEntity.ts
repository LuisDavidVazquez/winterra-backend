import { HabitTypeId } from '../value-objects/HabitTypeId';

export class HabitTypeEntity {
  private readonly id: HabitTypeId;
  private name: string;
  private description: string | null;

  constructor(
    id: number,
    name: string,
    description: string | null = null
  ) {
    this.id = new HabitTypeId(id);
    this.name = name;
    this.description = description;
  }

  // Getters
  getId(): HabitTypeId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | null {
    return this.description;
  }

  // Business methods
  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Habit type name cannot be empty');
    }
    this.name = name.trim();
  }

  updateDescription(description: string | null): void {
    this.description = description;
  }

  // Validation methods
  isValid(): boolean {
    return this.name.trim().length > 0;
  }
} 