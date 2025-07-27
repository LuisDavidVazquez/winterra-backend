import { SleepQuality } from '../value-objects/SleepQuality';

export class SleepSessionEntity {
  private readonly id: string;
  private readonly userHabitId: string;
  private sleepTime: Date;
  private wakeUpTime: Date;
  private totalHours: number | null;
  private sleepQuality: SleepQuality | null;
  private notes: string | null;
  private readonly createdAt: Date;

  constructor(
    id: string,
    userHabitId: string,
    sleepTime: Date,
    wakeUpTime: Date,
    totalHours: number | null = null,
    sleepQuality: string | null = null,
    notes: string | null = null,
    createdAt?: Date
  ) {
    this.id = id;
    this.userHabitId = userHabitId;
    this.sleepTime = sleepTime;
    this.wakeUpTime = wakeUpTime;
    this.totalHours = totalHours;
    this.sleepQuality = sleepQuality ? new SleepQuality(sleepQuality) : null;
    this.notes = notes;
    this.createdAt = createdAt || new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getUserHabitId(): string {
    return this.userHabitId;
  }

  getSleepTime(): Date {
    return this.sleepTime;
  }

  getWakeUpTime(): Date {
    return this.wakeUpTime;
  }

  getTotalHours(): number | null {
    return this.totalHours;
  }

  getSleepQuality(): SleepQuality | null {
    return this.sleepQuality;
  }

  getNotes(): string | null {
    return this.notes;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  updateSleepTime(sleepTime: Date): void {
    this.sleepTime = sleepTime;
  }

  updateWakeUpTime(wakeUpTime: Date): void {
    this.wakeUpTime = wakeUpTime;
  }

  updateTotalHours(totalHours: number | null): void {
    this.totalHours = totalHours;
  }

  updateSleepQuality(sleepQuality: string | null): void {
    this.sleepQuality = sleepQuality ? new SleepQuality(sleepQuality) : null;
  }

  updateNotes(notes: string | null): void {
    this.notes = notes;
  }

  // Validation methods
  isValid(): boolean {
    return this.id.length > 0 && 
           this.userHabitId.length > 0 && 
           this.sleepTime < this.wakeUpTime;
  }

  calculateTotalHours(): number {
    const diffMs = this.wakeUpTime.getTime() - this.sleepTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.round(diffHours * 100) / 100; // Redondear a 2 decimales
  }

  getSleepDurationInHours(): number {
    return this.calculateTotalHours();
  }
} 