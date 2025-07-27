import { HabitName } from '../value-objects/HabitName';
import { RoutineDays } from '../value-objects/RoutineDays';

export class UserHabitEntity {
  private readonly id: string;
  private readonly userId: string;
  private habitId: string | null;
  private name: HabitName | null;
  private description: string | null;
  private routineDays: RoutineDays;
  private readonly createdAt: Date;

  constructor(
    id: string,
    userId: string,
    habitId: string | null = null,
    name: string | null = null,
    description: string | null = null,
    routineDays: string = '1111111', // Por defecto todos los días
    createdAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.habitId = habitId;
    this.name = name ? new HabitName(name) : null;
    this.description = description;
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

  getName(): string | null {
    return this.name?.getValue() || null;
  }

  getDescription(): string | null {
    return this.description;
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

  updateName(name: string | null): void {
    this.name = name ? new HabitName(name) : null;
  }

  updateDescription(description: string | null): void {
    this.description = description;
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
    return this.name !== null;
  }

  isSystemHabit(): boolean {
    return this.habitId !== null;
  }
} 