export class Coins {
  private readonly value: number;

  constructor(coins: number) {
    this.validate(coins);
    this.value = coins;
  }

  private validate(coins: number): void {
    if (coins < 0) {
      throw new Error('Coins cannot be negative');
    }

    if (!Number.isInteger(coins)) {
      throw new Error('Coins must be an integer');
    }

    // Límite máximo razonable para evitar overflow
    if (coins > 999999999) {
      throw new Error('Coins value is too high');
    }
  }

  getValue(): number {
    return this.value;
  }

  add(amount: number): Coins {
    return new Coins(this.value + amount);
  }

  subtract(amount: number): Coins {
    const newValue = this.value - amount;
    if (newValue < 0) {
      throw new Error('Insufficient coins');
    }
    return new Coins(newValue);
  }

  canAfford(amount: number): boolean {
    return this.value >= amount;
  }

  equals(other: Coins): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: Coins): boolean {
    return this.value > other.value;
  }

  isLessThan(other: Coins): boolean {
    return this.value < other.value;
  }

  toString(): string {
    return this.value.toString();
  }
} 