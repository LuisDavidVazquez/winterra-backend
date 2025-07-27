export class HabitName {
  private readonly value: string;

  constructor(name: string) {
    this.validate(name);
    this.value = name.trim();
  }

  private validate(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Habit name cannot be empty');
    }

    if (name.trim().length > 100) {
      throw new Error('Habit name cannot exceed 100 characters');
    }

    if (name.trim().length < 2) {
      throw new Error('Habit name must be at least 2 characters long');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: HabitName): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
} 