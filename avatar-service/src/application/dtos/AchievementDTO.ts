// Request DTOs
export interface CreateAchievementRequestDTO {
  name: string;
  description: string;
  img?: string;
}

export interface UpdateAchievementRequestDTO {
  name?: string;
  description?: string;
  img?: string;
}

// Response DTOs
export interface AchievementResponseDTO {
  id: string;
  name: string;
  description: string;
  img: string | null;
  createdAt: string;
}

export interface CreateAchievementResponseDTO {
  success: boolean;
  data: AchievementResponseDTO;
  message: string;
}

export interface GetAchievementResponseDTO {
  success: boolean;
  data: AchievementResponseDTO | null;
  message: string;
}

export interface GetAllAchievementsResponseDTO {
  success: boolean;
  data: AchievementResponseDTO[];
  message: string;
}

export interface UpdateAchievementResponseDTO {
  success: boolean;
  data: AchievementResponseDTO;
  message: string;
}

export interface DeleteAchievementResponseDTO {
  success: boolean;
  data: null;
  message: string;
} 