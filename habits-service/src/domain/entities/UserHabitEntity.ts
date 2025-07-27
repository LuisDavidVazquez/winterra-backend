import { HabitName } from '../value-objects/HabitName';
import { RoutineDays } from '../value-objects/RoutineDays';

export class UserHabitEntity {
  private readonly id: string;
  private readonly userId: string;
  private habitId: string | null;
  private customName: HabitName | null;
  private customDescription: string | null;
  private routineDays: RoutineDays;
  private readonly createdAt: Date;

  constructor(
    id: string,
    userId: string,
    habitId: string | null = null,
    customName: string | null = null,
    customDescription: string | null = null,
    routineDays: string = '1111111', // Por defecto todos los días
    createdAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.habitId = habitId;
    this.customName = customName ? new HabitName(customName) : null;
    this.customDescription = customDescription;
    this.routineDays = new RoutineDays(routineDays);
    this.createdAt = createdAt || new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getHabitId(): string | null {
    return this.habitId;
  }

  getCustomName(): string | null {
    return this.customName?.getValue() || null;
  }

  getCustomDescription(): string | null {
    return this.customDescription;
  }

  getRoutineDays(): RoutineDays {
    return this.routineDays;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  updateHabitId(habitId: string | null): void {
    this.habitId = habitId;
  }

  updateCustomName(customName: string | null): void {
    this.customName = customName ? new HabitName(customName) : null;
  }

  updateCustomDescription(customDescription: string | null): void {
    this.customDescription = customDescription;
  }

  updateRoutineDays(routineDays: string): void {
    this.routineDays = new RoutineDays(routineDays);
  }

  isActiveOnDay(dayIndex: number): boolean {
    return this.routineDays.isActiveOnDay(dayIndex);
  }

  getActiveDays(): number[] {
    return this.routineDays.getActiveDays();
  }

  getActiveDayNames(): string[] {
    return this.routineDays.getDayNames();
  }

  // Validation methods
  isValid(): boolean {
    return this.userId.length > 0 && this.routineDays.getValue().includes('1');
  }

  isCustomHabit(): boolean {
    return this.customName !== null;
  }

  isSystemHabit(): boolean {
    return this.habitId !== null;
  }
} 