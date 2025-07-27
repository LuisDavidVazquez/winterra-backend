export class HabitCategoryId {
  private readonly value: number;

  constructor(id: number) {
    this.validate(id);
    this.value = id;
  }

  private validate(id: number): void {
    // Permitir 0 para nuevos registros (será generado por la base de datos)
    if (id < 0) {
      throw new Error('Habit category ID must be a non-negative integer');
    }

    if (!Number.isInteger(id)) {
      throw new Error('Habit category ID must be an integer');
    }
  }

  getValue(): number {
    return this.value;
  }

  equals(other: HabitCategoryId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 