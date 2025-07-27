import { AchievementRepository } from '../../domain/repositories/AchievementRepository';
import { GetAllAchievementsResponseDTO } from '../dtos/AchievementDTO';

export class GetAllAchievementsUseCase {
  constructor(private achievementRepository: AchievementRepository) {}

  async execute(): Promise<GetAllAchievementsResponseDTO> {
    try {
      const achievements = await this.achievementRepository.findAll();

      const response: GetAllAchievementsResponseDTO = {
        success: true,
        data: achievements.map(achievement => ({
          id: achievement.getId(),
          name: achievement.getName(),
          description: achievement.getDescription(),
          img: achievement.getImg(),
          typeId: achievement.getTypeId(),
          condition: achievement.getCondition(),
          createdAt: achievement.getCreatedAt().toISOString()
        })),
        message: 'Achievements retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve achievements: ${error.message}`);
    }
  }
} 