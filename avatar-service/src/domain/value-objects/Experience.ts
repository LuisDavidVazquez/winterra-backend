export class Experience {
  private readonly value: number;

  constructor(experience: number) {
    this.validate(experience);
    this.value = experience;
  }

  private validate(experience: number): void {
    if (experience < 0) {
      throw new Error('Experience cannot be negative');
    }

    if (!Number.isInteger(experience)) {
      throw new Error('Experience must be an integer');
    }

    // Límite máximo razonable para evitar overflow
    if (experience > 999999999) {
      throw new Error('Experience value is too high');
    }
  }

  getValue(): number {
    return this.value;
  }

  add(amount: number): Experience {
    return new Experience(this.value + amount);
  }

  equals(other: Experience): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: Experience): boolean {
    return this.value > other.value;
  }

  isLessThan(other: Experience): boolean {
    return this.value < other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 