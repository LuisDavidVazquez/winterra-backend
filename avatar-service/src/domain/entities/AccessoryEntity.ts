import { Rarity } from '../value-objects/Rarity';
import { AccessoryType } from '../value-objects/AccessoryType';

export class AccessoryEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly type: AccessoryType,
    private readonly price: number,
    private readonly rarity: Rarity,
    private readonly createdAt: Date
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): AccessoryType {
    return this.type;
  }

  getTypeValue(): number {
    return this.type.getValue();
  }

  getTypeName(): string {
    return this.type.getName();
  }

  getPrice(): number {
    return this.price;
  }

  getRarity(): Rarity {
    return this.rarity;
  }

  getRarityValue(): number {
    return this.rarity.getValue();
  }

  getRarityName(): string {
    return this.rarity.getName();
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  isLegendary(): boolean {
    return this.rarity.getValue() === 3;
  }

  isEpic(): boolean {
    return this.rarity.getValue() === 2;
  }

  isSpecial(): boolean {
    return this.rarity.getValue() === 1;
  }

  canBePurchasedWithCoins(userCoins: number): boolean {
    return userCoins >= this.price;
  }

  getDiscountPrice(): number {
    // Apply discount based on rarity
    switch (this.rarity.getValue()) {
      case 1: // Especial - 10% discount
        return Math.floor(this.price * 0.9);
      case 2: // Épico - 5% discount
        return Math.floor(this.price * 0.95);
      case 3: // Legendario - No discount
        return this.price;
      default:
        return this.price;
    }
  }
} 