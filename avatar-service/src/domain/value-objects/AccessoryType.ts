export class AccessoryType {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 1 || value > 4) {
      throw new Error('AccessoryType must be an integer between 1 and 4');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  getName(): string {
    switch (this.value) {
      case 1:
        return 'Cabeza';
      case 2:
        return 'Pecho';
      case 3:
        return 'Pantalón';
      case 4:
        return 'Zapatos';
      default:
        return 'Desconocido';
    }
  }

  equals(other: AccessoryType): boolean {
    return this.value === other.value;
  }

  static createCabeza(): AccessoryType {
    return new AccessoryType(1);
  }

  static createPecho(): AccessoryType {
    return new AccessoryType(2);
  }

  static createPantalon(): AccessoryType {
    return new AccessoryType(3);
  }

  static createZapatos(): AccessoryType {
    return new AccessoryType(4);
  }
} 