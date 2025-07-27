import { FocusLevel } from '../value-objects/FocusLevel';

export class StudySessionEntity {
  private readonly id: string;
  private readonly userHabitId: string;
  private subject: string | null;
  private topic: string | null;
  private focusLevel: FocusLevel | null;
  private notes: string | null;
  private durationMinutes: number | null;
  private startedAt: Date | null;
  private endedAt: Date | null;
  private readonly createdAt: Date;

  constructor(
    id: string,
    userHabitId: string,
    subject: string | null = null,
    topic: string | null = null,
    focusLevel: number | null = null,
    notes: string | null = null,
    durationMinutes: number | null = null,
    startedAt: Date | null = null,
    endedAt: Date | null = null,
    createdAt?: Date
  ) {
    this.id = id;
    this.userHabitId = userHabitId;
    this.subject = subject;
    this.topic = topic;
    this.focusLevel = focusLevel ? new FocusLevel(focusLevel) : null;
    this.notes = notes;
    this.durationMinutes = durationMinutes;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.createdAt = createdAt || new Date();
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getUserHabitId(): string {
    return this.userHabitId;
  }

  getSubject(): string | null {
    return this.subject;
  }

  getTopic(): string | null {
    return this.topic;
  }

  getFocusLevel(): FocusLevel | null {
    return this.focusLevel;
  }

  getNotes(): string | null {
    return this.notes;
  }

  getDurationMinutes(): number | null {
    return this.durationMinutes;
  }

  getStartedAt(): Date | null {
    return this.startedAt;
  }

  getEndedAt(): Date | null {
    return this.endedAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // Business methods
  updateSubject(subject: string | null): void {
    this.subject = subject;
  }

  updateTopic(topic: string | null): void {
    this.topic = topic;
  }

  updateFocusLevel(focusLevel: number | null): void {
    this.focusLevel = focusLevel ? new FocusLevel(focusLevel) : null;
  }

  updateNotes(notes: string | null): void {
    this.notes = notes;
  }

  updateDurationMinutes(durationMinutes: number | null): void {
    this.durationMinutes = durationMinutes;
  }

  updateStartedAt(startedAt: Date | null): void {
    this.startedAt = startedAt;
  }

  updateEndedAt(endedAt: Date | null): void {
    this.endedAt = endedAt;
  }

  // Validation methods
  isValid(): boolean {
    return this.id.length > 0 && this.userHabitId.length > 0;
  }

  isCompleted(): boolean {
    return this.startedAt !== null && this.endedAt !== null;
  }

  getDurationInMinutes(): number | null {
    if (!this.startedAt || !this.endedAt) {
      return null;
    }
    return Math.round((this.endedAt.getTime() - this.startedAt.getTime()) / (1000 * 60));
  }
} 