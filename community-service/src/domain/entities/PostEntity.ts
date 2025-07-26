export class PostEntity {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly content: string,
    private readonly imageUrl: string | null,
    private readonly createdAt: Date
  ) {}

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getContent(): string {
    return this.content;
  }

  getImageUrl(): string | null {
    return this.imageUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  getContentLength(): number {
    return this.content.length;
  }

  isShortPost(): boolean {
    return this.content.length <= 100;
  }

  isLongPost(): boolean {
    return this.content.length > 500;
  }

  getContentPreview(maxLength: number = 100): string {
    if (this.content.length <= maxLength) {
      return this.content;
    }
    return this.content.substring(0, maxLength) + '...';
  }

  hasImage(): boolean {
    return this.imageUrl !== null && this.imageUrl.trim().length > 0;
  }

  getDaysSinceCreated(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isRecent(): boolean {
    return this.getDaysSinceCreated() <= 7;
  }
} 