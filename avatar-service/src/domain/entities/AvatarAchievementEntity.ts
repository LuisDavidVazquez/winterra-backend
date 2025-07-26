export class AvatarAchievementEntity {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly achievementId: string,
    private readonly unlockedAt: Date
  ) {}

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getAchievementId(): string {
    return this.achievementId;
  }

  getUnlockedAt(): Date {
    return this.unlockedAt;
  }

  // Business methods
  isRecentlyUnlocked(daysThreshold: number = 7): boolean {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.unlockedAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= daysThreshold;
  }

  getDaysSinceUnlocked(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.unlockedAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
} 