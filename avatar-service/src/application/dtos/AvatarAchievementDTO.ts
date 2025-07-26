// Request DTOs
export interface UnlockAchievementRequestDTO {
  achievementId: string;
}

// Response DTOs
export interface AvatarAchievementResponseDTO {
  id: string;
  userId: string;
  achievementId: string;
  achievementName: string;
  achievementDescription: string;
  achievementImg: string | null;
  unlockedAt: string;
  daysSinceUnlocked: number;
  isRecentlyUnlocked: boolean;
}

export interface UnlockAchievementResponseDTO {
  success: boolean;
  data: AvatarAchievementResponseDTO;
  message: string;
}

export interface GetUserAchievementsResponseDTO {
  success: boolean;
  data: AvatarAchievementResponseDTO[];
  message: string;
}

export interface GetRecentAchievementsResponseDTO {
  success: boolean;
  data: AvatarAchievementResponseDTO[];
  message: string;
} 