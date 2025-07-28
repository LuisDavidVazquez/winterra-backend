export enum DuelStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export class HabitDuelEntity {
  private readonly id: string;
  private userHabitId: string;
  private challengerId: string;
  private opponentId: string;
  private streakChallenger: number;
  private streakOpponent: number;
  private status: DuelStatus;
  private readonly createdAt: Date;
  private completedAt: Date | null;

  constructor(
    id: string,
    userHabitId: string,
    challengerId: string,
    opponentId: string,
    streakChallenger: number = 0,
    streakOpponent: number = 0,
    status: DuelStatus = DuelStatus.PENDING,
    createdAt?: Date,
    completedAt?: Date | null
  ) {
    this.id = id;
    this.userHabitId = userHabitId;
    this.challengerId = challengerId;
    this.opponentId = opponentId;
    this.streakChallenger = streakChallenger;
    this.streakOpponent = streakOpponent;
    this.status = status;
    this.createdAt = createdAt || new Date();
    this.completedAt = completedAt || null;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getUserHabitId(): string {
    return this.userHabitId;
  }

  getChallengerId(): string {
    return this.challengerId;
  }

  getOpponentId(): string {
    return this.opponentId;
  }

  getStreakChallenger(): number {
    return this.streakChallenger;
  }

  getStreakOpponent(): number {
    return this.streakOpponent;
  }

  getStatus(): DuelStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getCompletedAt(): Date | null {
    return this.completedAt;
  }

  // Business methods
  accept(): void {
    if (this.status === DuelStatus.PENDING) {
      this.status = DuelStatus.ACCEPTED;
    }
  }

  reject(): void {
    if (this.status === DuelStatus.PENDING) {
      this.status = DuelStatus.REJECTED;
    }
  }

  complete(): void {
    if (this.status === DuelStatus.ACCEPTED) {
      this.status = DuelStatus.COMPLETED;
      this.completedAt = new Date();
    }
  }

  cancel(): void {
    if (this.status === DuelStatus.PENDING || this.status === DuelStatus.ACCEPTED) {
      this.status = DuelStatus.CANCELLED;
    }
  }

  updateStreakChallenger(streak: number): void {
    this.streakChallenger = Math.max(0, streak);
  }

  updateStreakOpponent(streak: number): void {
    this.streakOpponent = Math.max(0, streak);
  }

  // Status checks
  isPending(): boolean {
    return this.status === DuelStatus.PENDING;
  }

  isAccepted(): boolean {
    return this.status === DuelStatus.ACCEPTED;
  }

  isRejected(): boolean {
    return this.status === DuelStatus.REJECTED;
  }

  isCompleted(): boolean {
    return this.status === DuelStatus.COMPLETED;
  }

  isCancelled(): boolean {
    return this.status === DuelStatus.CANCELLED;
  }

  isActive(): boolean {
    return this.status === DuelStatus.ACCEPTED;
  }

  // Winner determination
  getWinner(): string | null {
    if (!this.isCompleted()) {
      return null;
    }
    
    if (this.streakChallenger > this.streakOpponent) {
      return this.challengerId;
    } else if (this.streakOpponent > this.streakChallenger) {
      return this.opponentId;
    }
    
    return null; // Tie
  }

  isTie(): boolean {
    if (!this.isCompleted()) {
      return false;
    }
    return this.streakChallenger === this.streakOpponent;
  }

  // Duration calculation
  getDurationInDays(): number {
    if (!this.completedAt) {
      return Math.floor((new Date().getTime() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((this.completedAt.getTime() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
  }
} 