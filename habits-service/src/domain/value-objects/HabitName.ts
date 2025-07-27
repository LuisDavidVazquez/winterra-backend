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

    // Validar que solo contenga letras, números, espacios y algunos caracteres especiales
    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_]+$/.test(name.trim())) {
      throw new Error('Habit name contains invalid characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: HabitName): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  toString(): string {
    return this.value;
  }
} 