export class StreakDays {
  private readonly value: number;

  constructor(streakDays: number) {
    this.validate(streakDays);
    this.value = streakDays;
  }

  private validate(streakDays: number): void {
    if (streakDays < 0) {
      throw new Error('Streak days cannot be negative');
    }

    if (!Number.isInteger(streakDays)) {
      throw new Error('Streak days must be an integer');
    }

    // Límite máximo razonable (más de 365 días sería muy raro)
    if (streakDays > 9999) {
      throw new Error('Streak days value is too high');
    }
  }

  getValue(): number {
    return this.value;
  }

  increment(): StreakDays {
    return new StreakDays(this.value + 1);
  }

  reset(): StreakDays {
    return new StreakDays(0);
  }

  isActive(): boolean {
    return this.value > 0;
  }

  getDays(): number {
    return this.value;
  }

  equals(other: StreakDays): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: StreakDays): boolean {
    return this.value > other.value;
  }

  isLessThan(other: StreakDays): boolean {
    return this.value < other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 