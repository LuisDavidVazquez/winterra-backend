export class CommentEntity {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly postId: string,
    private readonly content: string,
    private readonly createdAt: Date
  ) {}

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getPostId(): string {
    return this.postId;
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

  isShortComment(): boolean {
    return this.content.length <= 50;
  }

  isLongComment(): boolean {
    return this.content.length > 200;
  }

  getContentPreview(maxLength: number = 50): string {
    if (this.content.length <= maxLength) {
      return this.content;
    }
    return this.content.substring(0, maxLength) + '...';
  }

  getDaysSinceCreated(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isRecent(): boolean {
    return this.getDaysSinceCreated() <= 3;
  }
} 