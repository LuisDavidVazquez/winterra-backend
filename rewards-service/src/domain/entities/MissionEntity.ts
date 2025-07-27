export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export class MissionEntity {
  private readonly id: string;
  private habitId: number;
  private title: string;
  private description: string;
  private difficultyLevel: DifficultyLevel;
  private expReward: number;
  private coinReward: number;
  private createdBySystem: boolean;
  private readonly createdAt: Date;

  constructor(
    id: string,
    habitId: number,
    title: string,
    description: string,
    difficultyLevel: DifficultyLevel,
    expReward: number,
    coinReward: number,
    createdBySystem: boolean = true,
    createdAt?: Date
  ) {
    this.id = id;
    this.habitId = habitId;
    this.title = title;
    this.description = description;
    this.difficultyLevel = difficultyLevel;
    this.expReward = expReward;
    this.coinReward = coinReward;
    this.createdBySystem = createdBySystem;
    this.createdAt = createdAt || new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getHabitId(): number {
    return this.habitId;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getDifficultyLevel(): DifficultyLevel {
    return this.difficultyLevel;
  }

  getExpReward(): number {
    return this.expReward;
  }

  getCoinReward(): number {
    return this.coinReward;
  }

  isCreatedBySystem(): boolean {
    return this.createdBySystem;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  updateTitle(title: string): void {
    this.title = title;
  }

  updateDescription(description: string): void {
    this.description = description;
  }

  updateDifficultyLevel(difficultyLevel: DifficultyLevel): void {
    this.difficultyLevel = difficultyLevel;
  }

  updateRewards(expReward: number, coinReward: number): void {
    this.expReward = expReward;
    this.coinReward = coinReward;
  }

  setCreatedBySystem(createdBySystem: boolean): void {
    this.createdBySystem = createdBySystem;
  }

  isEasy(): boolean {
    return this.difficultyLevel === DifficultyLevel.EASY;
  }

  isMedium(): boolean {
    return this.difficultyLevel === DifficultyLevel.MEDIUM;
  }

  isHard(): boolean {
    return this.difficultyLevel === DifficultyLevel.HARD;
  }
} 