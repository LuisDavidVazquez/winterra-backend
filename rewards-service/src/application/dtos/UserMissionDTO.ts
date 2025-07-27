import { UserMissionStatus } from '../../domain/entities/UserMissionEntity';

export interface CreateUserMissionDTO {
  userHabitsId: string;
  missionId: string;
  objective: number;
  progress?: number;
  status?: UserMissionStatus;
}

export interface UpdateUserMissionDTO {
  progress?: number;
  status?: UserMissionStatus;
}

export interface UserMissionResponseDTO {
  id: string;
  userHabitsId: string;
  missionId: string;
  status: string;
  progress: number;
  objective: number;
  assignedAt: Date;
  completedAt: Date | null;
  progressPercentage: number;
}

export interface UserMissionListResponseDTO {
  userMissions: UserMissionResponseDTO[];
  total: number;
}

export interface AssignMissionDTO {
  userHabitsId: string;
  missionId: string;
  objective: number;
}

export interface UpdateProgressDTO {
  progress: number;
} 