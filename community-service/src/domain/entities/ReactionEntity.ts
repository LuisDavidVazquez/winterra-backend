export class ReactionEntity {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly postId: string,
    private readonly reactedAt: Date
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

  getReactedAt(): Date {
    return this.reactedAt;
  }

  // Business methods
  getDaysSinceReaction(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.reactedAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isRecentReaction(): boolean {
    return this.getDaysSinceReaction() <= 1;
  }

  isToday(): boolean {
    const now = new Date();
    const reactionDate = this.reactedAt;
    
    return now.toDateString() === reactionDate.toDateString();
  }
} 