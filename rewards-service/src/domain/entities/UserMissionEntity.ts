export enum UserMissionStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export class UserMissionEntity {
  private readonly id: string;
  private userHabitsId: string;
  private missionId: string;
  private status: UserMissionStatus;
  private progress: number;
  private readonly assignedAt: Date;
  private completedAt: Date | null;

  constructor(
    id: string,
    userHabitsId: string,
    missionId: string,
    status: UserMissionStatus = UserMissionStatus.IN_PROGRESS,
    progress: number = 0,
    assignedAt?: Date,
    completedAt?: Date | null
  ) {
    this.id = id;
    this.userHabitsId = userHabitsId;
    this.missionId = missionId;
    this.status = status;
    this.progress = progress;
    this.assignedAt = assignedAt || new Date();
    this.completedAt = completedAt || null;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getUserHabitsId(): string {
    return this.userHabitsId;
  }

  getMissionId(): string {
    return this.missionId;
  }

  getStatus(): UserMissionStatus {
    return this.status;
  }

  getProgress(): number {
    return this.progress;
  }

  getAssignedAt(): Date {
    return this.assignedAt;
  }

  getCompletedAt(): Date | null {
    return this.completedAt;
  }

  // Business methods
  updateProgress(progress: number, objective: number): void {
    this.progress = Math.min(progress, objective);
    
    if (this.progress >= objective) {
      this.complete();
    }
  }

  complete(): void {
    this.status = UserMissionStatus.COMPLETED;
    this.completedAt = new Date();
  }

  isCompleted(): boolean {
    return this.status === UserMissionStatus.COMPLETED;
  }

  isInProgress(): boolean {
    return this.status === UserMissionStatus.IN_PROGRESS;
  }

  getProgressPercentage(objective: number): number {
    return (this.progress / objective) * 100;
  }

  isProgressComplete(objective: number): boolean {
    return this.progress >= objective;
  }

  resetProgress(): void {
    this.progress = 0;
    this.status = UserMissionStatus.IN_PROGRESS;
    this.completedAt = null;
  }
} 