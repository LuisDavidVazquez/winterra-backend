export class AvatarAccessoryEntity {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly accessoryId: string,
    private readonly isEquipped: boolean,
    private readonly unlockedAt: Date
  ) {}

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getAccessoryId(): string {
    return this.accessoryId;
  }

  getIsEquipped(): boolean {
    return this.isEquipped;
  }

  getUnlockedAt(): Date {
    return this.unlockedAt;
  }

  // Business methods
  equip(): AvatarAccessoryEntity {
    return new AvatarAccessoryEntity(
      this.id,
      this.userId,
      this.accessoryId,
      true,
      this.unlockedAt
    );
  }

  unequip(): AvatarAccessoryEntity {
    return new AvatarAccessoryEntity(
      this.id,
      this.userId,
      this.accessoryId,
      false,
      this.unlockedAt
    );
  }

  toggleEquip(): AvatarAccessoryEntity {
    return this.isEquipped ? this.unequip() : this.equip();
  }

  isUnlocked(): boolean {
    return this.unlockedAt <= new Date();
  }
} 