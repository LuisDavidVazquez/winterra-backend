import { Experience } from '../value-objects/Experience';
import { Level } from '../value-objects/Level';
import { Coins } from '../value-objects/Coins';
import { StreakDays } from '../value-objects/StreakDays';

export class AvatarEntity {
  private readonly id: string;
  private readonly userId: string;
  private experience: Experience;
  private level: Level;
  private coins: Coins;
  private streakDays: StreakDays;
  private readonly createdAt: Date;

  constructor(
    id: string,
    userId: string,
    experience: number = 0,
    level: number = 1,
    coins: number = 0,
    streakDays: number = 0,
    createdAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.experience = new Experience(experience);
    this.level = new Level(level);
    this.coins = new Coins(coins);
    this.streakDays = new StreakDays(streakDays);
    this.createdAt = createdAt || new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getExperience(): Experience {
    return this.experience;
  }

  getLevel(): Level {
    return this.level;
  }

  getCoins(): Coins {
    return this.coins;
  }

  getStreakDays(): StreakDays {
    return this.streakDays;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  addExperience(amount: number): void {
    this.experience = this.experience.add(amount);
    this.checkLevelUp();
  }

  addCoins(amount: number): void {
    this.coins = this.coins.add(amount);
  }

  spendCoins(amount: number): boolean {
    try {
      this.coins = this.coins.subtract(amount);
      return true;
    } catch (error) {
      return false;
    }
  }

  incrementStreak(): void {
    this.streakDays = this.streakDays.increment();
  }

  resetStreak(): void {
    this.streakDays = this.streakDays.reset();
  }

  private checkLevelUp(): void {
    const experienceForNextLevel = this.level.calculateExperienceRequired();
    if (this.experience.getValue() >= experienceForNextLevel) {
      this.level = this.level.increment();
      // Could add domain events here for level up notifications
    }
  }

  // Validation methods
  canAfford(amount: number): boolean {
    return this.coins.canAfford(amount);
  }

  getExperienceToNextLevel(): number {
    const experienceForNextLevel = this.level.calculateExperienceRequired();
    return Math.max(0, experienceForNextLevel - this.experience.getValue());
  }

  // Domain methods that return primitive values for DTOs
  getExperienceValue(): number {
    return this.experience.getValue();
  }

  getLevelValue(): number {
    return this.level.getValue();
  }

  getCoinsValue(): number {
    return this.coins.getValue();
  }

  getStreakDaysValue(): number {
    return this.streakDays.getValue();
  }
} 