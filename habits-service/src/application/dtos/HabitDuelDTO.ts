import { DuelStatus } from '../../domain/entities/HabitDuelEntity';

export interface CreateHabitDuelDTO {
  userHabitId: string;
  challengerId: string;
  opponentId: string;
}

export interface UpdateHabitDuelDTO {
  streakChallenger?: number;
  streakOpponent?: number;
  status?: DuelStatus;
}

export interface AcceptDuelDTO {
  duelId: string;
  opponentId: string;
}

export interface RejectDuelDTO {
  duelId: string;
  opponentId: string;
}

export interface CompleteDuelDTO {
  duelId: string;
  userId: string;
  streakChallenger: number;
  streakOpponent: number;
}

export interface CancelDuelDTO {
  duelId: string;
  userId: string;
}

export interface HabitDuelResponseDTO {
  id: string;
  userHabitId: string;
  challengerId: string;
  opponentId: string;
  streakChallenger: number;
  streakOpponent: number;
  status: string;
  createdAt: Date;
  completedAt: Date | null;
  winner: string | null;
  isTie: boolean;
  durationInDays: number;
}

export interface HabitDuelListResponseDTO {
  duels: HabitDuelResponseDTO[];
  total: number;
}

export interface HabitDuelStatsDTO {
  totalDuels: number;
  activeDuels: number;
  completedDuels: number;
  wins: number;
  losses: number;
  ties: number;
  averageStreak: number;
  longestStreak: number;
} 