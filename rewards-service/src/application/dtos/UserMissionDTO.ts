import { UserMissionStatus } from '../../domain/entities/UserMissionEntity';

export interface CreateUserMissionDTO {
  userHabitsId: string;
  missionId: string;
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
}

export interface UpdateProgressDTO {
  progress: number;
} 