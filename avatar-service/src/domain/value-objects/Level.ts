export class Level {
  private readonly value: number;

  constructor(level: number) {
    this.validate(level);
    this.value = level;
  }

  private validate(level: number): void {
    if (level < 1) {
      throw new Error('Level must be at least 1');
    }

    if (!Number.isInteger(level)) {
      throw new Error('Level must be an integer');
    }

    // Límite máximo razonable
    if (level > 999999) {
      throw new Error('Level value is too high');
    }
  }

  getValue(): number {
    return this.value;
  }

  increment(): Level {
    return new Level(this.value + 1);
  }

  calculateExperienceRequired(): number {
    return this.value * 100; // 100 exp por nivel
  }

  equals(other: Level): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: Level): boolean {
    return this.value > other.value;
  }

  isLessThan(other: Level): boolean {
    return this.value < other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 