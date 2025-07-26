export class AchievementEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly description: string,
    private readonly img: string | null,
    private readonly createdAt: Date
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getImg(): string | null {
    return this.img;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  hasImage(): boolean {
    return this.img !== null && this.img.trim().length > 0;
  }

  getImageUrl(): string {
    return this.img || '';
  }
} 