export class EncouragementNoteEntity {
  constructor(
    private readonly id: string,
    private readonly avatarId: string,
    private readonly content: string,
    private readonly createdAt: Date
  ) {}

  getId(): string {
    return this.id;
  }

  getAvatarId(): string {
    return this.avatarId;
  }

  getContent(): string {
    return this.content;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  getContentLength(): number {
    return this.content.length;
  }

  isShortNote(): boolean {
    return this.content.length <= 100;
  }

  isLongNote(): boolean {
    return this.content.length > 500;
  }

  getContentPreview(maxLength: number = 50): string {
    if (this.content.length <= maxLength) {
      return this.content;
    }
    return this.content.substring(0, maxLength) + '...';
  }
} 