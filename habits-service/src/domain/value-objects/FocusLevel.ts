export class FocusLevel {
  private readonly value: number;

  constructor(level: number) {
    this.validate(level);
    this.value = level;
  }

  private validate(level: number): void {
    if (!Number.isInteger(level)) {
      throw new Error('Focus level must be an integer');
    }

    if (level < 1 || level > 10) {
      throw new Error('Focus level must be between 1 and 10');
    }
  }

  getValue(): number {
    return this.value;
  }

  equals(other: FocusLevel): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 