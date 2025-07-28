import { DifficultyLevel } from '../../domain/entities/MissionEntity';

export interface CreateMissionDTO {
  habitId: number;
  title: string;
  description: string;
  difficultyLevel: DifficultyLevel;
  expReward: number;
  coinReward: number;
  objective: number;
  createdBySystem?: boolean;
}

export interface UpdateMissionDTO {
  title?: string;
  description?: string;
  difficultyLevel?: DifficultyLevel;
  expReward?: number;
  coinReward?: number;
  objective?: number;
  createdBySystem?: boolean;
}

export interface MissionResponseDTO {
  id: string;
  habitId: number;
  title: string;
  description: string;
  difficultyLevel: string;
  expReward: number;
  coinReward: number;
  objective: number;
  createdBySystem: boolean;
  createdAt: Date;
}

export interface MissionListResponseDTO {
  missions: MissionResponseDTO[];
  total: number;
} 