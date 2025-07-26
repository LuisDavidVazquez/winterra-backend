import { AvatarAchievementRepository } from '../../domain/repositories/AvatarAchievementRepository';
import { AchievementRepository } from '../../domain/repositories/AchievementRepository';
import { GetUserAchievementsResponseDTO } from '../dtos/AvatarAchievementDTO';

export class GetUserAchievementsUseCase {
  constructor(
    private avatarAchievementRepository: AvatarAchievementRepository,
    private achievementRepository: AchievementRepository
  ) {}

  async execute(userId: string): Promise<GetUserAchievementsResponseDTO> {
    try {
      const userAchievements = await this.avatarAchievementRepository.findByUserId(userId);
      
      // Get achievement details for each user achievement
      const achievementsWithDetails = await Promise.all(
        userAchievements.map(async (userAchievement) => {
          const achievement = await this.achievementRepository.findById(userAchievement.getAchievementId());
          if (!achievement) {
            throw new Error(`Achievement ${userAchievement.getAchievementId()} not found`);
          }

          return {
            id: userAchievement.getId(),
            userId: userAchievement.getUserId(),
            achievementId: userAchievement.getAchievementId(),
            achievementName: achievement.getName(),
            achievementDescription: achievement.getDescription(),
            achievementImg: achievement.getImg(),
            unlockedAt: userAchievement.getUnlockedAt().toISOString(),
            daysSinceUnlocked: userAchievement.getDaysSinceUnlocked(),
            isRecentlyUnlocked: userAchievement.isRecentlyUnlocked()
          };
        })
      );

      const response: GetUserAchievementsResponseDTO = {
        success: true,
        data: achievementsWithDetails,
        message: 'User achievements retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve user achievements: ${error.message}`);
    }
  }
} 