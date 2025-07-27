import { AchievementEntity } from '../../domain/entities/AchievementEntity';
import { AchievementRepository } from '../../domain/repositories/AchievementRepository';
import { IUUIDService } from '../services/IUUIDService';
import { CreateAchievementRequestDTO, CreateAchievementResponseDTO } from '../dtos/AchievementDTO';

export class CreateAchievementUseCase {
  constructor(
    private achievementRepository: AchievementRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(request: CreateAchievementRequestDTO): Promise<CreateAchievementResponseDTO> {
    try {
      // Validate input
      if (!request.name || request.name.trim().length === 0) {
        throw new Error('Achievement name is required');
      }

      if (!request.description || request.description.trim().length === 0) {
        throw new Error('Achievement description is required');
      }

      if (request.typeId === undefined || request.typeId < 1) {
        throw new Error('Achievement type_id is required and must be greater than 0');
      }

      if (request.condition === undefined || request.condition < 0) {
        throw new Error('Achievement condition is required and must be non-negative');
      }

      // Validate image URL if provided
      if (request.img && request.img.trim().length > 0) {
        try {
          new URL(request.img);
        } catch {
          throw new Error('Invalid image URL format');
        }
      }

      // Generate UUID
      const id = this.uuidService.generate();

      // Create achievement entity
      const achievement = new AchievementEntity(
        id,
        request.name.trim(),
        request.description.trim(),
        request.img?.trim() || null,
        request.typeId,
        request.condition,
        new Date()
      );

      // Save to repository
      const savedAchievement = await this.achievementRepository.save(achievement);

      // Return response
      const response: CreateAchievementResponseDTO = {
        success: true,
        data: {
          id: savedAchievement.getId(),
          name: savedAchievement.getName(),
          description: savedAchievement.getDescription(),
          img: savedAchievement.getImg(),
          typeId: savedAchievement.getTypeId(),
          condition: savedAchievement.getCondition(),
          createdAt: savedAchievement.getCreatedAt().toISOString()
        },
        message: 'Achievement created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create achievement: ${error.message}`);
    }
  }
} 