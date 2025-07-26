export class Rarity {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 1 || value > 3) {
      throw new Error('Rarity must be an integer between 1 and 3');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  getName(): string {
    switch (this.value) {
      case 1:
        return 'Especial';
      case 2:
        return 'Épico';
      case 3:
        return 'Legendario';
      default:
        return 'Desconocido';
    }
  }

  equals(other: Rarity): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: Rarity): boolean {
    return this.value > other.value;
  }

  isLessThan(other: Rarity): boolean {
    return this.value < other.value;
  }

  static createEspecial(): Rarity {
    return new Rarity(1);
  }

  static createEpico(): Rarity {
    return new Rarity(2);
  }

  static createLegendario(): Rarity {
    return new Rarity(3);
  }
} 