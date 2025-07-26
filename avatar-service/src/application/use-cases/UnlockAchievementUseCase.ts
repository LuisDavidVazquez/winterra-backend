import { AvatarAchievementEntity } from '../../domain/entities/AvatarAchievementEntity';
import { AchievementEntity } from '../../domain/entities/AchievementEntity';
import { AvatarAchievementRepository } from '../../domain/repositories/AvatarAchievementRepository';
import { AchievementRepository } from '../../domain/repositories/AchievementRepository';
import { IUUIDService } from '../services/IUUIDService';
import { UnlockAchievementRequestDTO, UnlockAchievementResponseDTO } from '../dtos/AvatarAchievementDTO';

export class UnlockAchievementUseCase {
  constructor(
    private avatarAchievementRepository: AvatarAchievementRepository,
    private achievementRepository: AchievementRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(userId: string, request: UnlockAchievementRequestDTO): Promise<UnlockAchievementResponseDTO> {
    try {
      // Get achievement to verify it exists
      const achievement = await this.achievementRepository.findById(request.achievementId);
      if (!achievement) {
        throw new Error('Achievement not found');
      }

      // Check if user already has this achievement
      const existingAchievement = await this.avatarAchievementRepository.findByUserIdAndAchievementId(userId, request.achievementId);
      if (existingAchievement) {
        throw new Error('User already has this achievement');
      }

      // Create avatar achievement relationship
      const avatarAchievement = new AvatarAchievementEntity(
        this.uuidService.generate(),
        userId,
        request.achievementId,
        new Date()
      );

      const savedAvatarAchievement = await this.avatarAchievementRepository.save(avatarAchievement);

      // Return response
      const response: UnlockAchievementResponseDTO = {
        success: true,
        data: {
          id: savedAvatarAchievement.getId(),
          userId: savedAvatarAchievement.getUserId(),
          achievementId: savedAvatarAchievement.getAchievementId(),
          achievementName: achievement.getName(),
          achievementDescription: achievement.getDescription(),
          achievementImg: achievement.getImg(),
          unlockedAt: savedAvatarAchievement.getUnlockedAt().toISOString(),
          daysSinceUnlocked: savedAvatarAchievement.getDaysSinceUnlocked(),
          isRecentlyUnlocked: savedAvatarAchievement.isRecentlyUnlocked()
        },
        message: 'Achievement unlocked successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to unlock achievement: ${error.message}`);
    }
  }
} 