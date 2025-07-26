import { AvatarRepository } from '../../domain/repositories/AvatarRepository';
import { GetAllAvatarsResponseDTO } from '../dtos/AvatarDTO';

export class GetAllAvatarsUseCase {
  constructor(private avatarRepository: AvatarRepository) {}

  async execute(): Promise<GetAllAvatarsResponseDTO> {
    const avatars = await this.avatarRepository.findAll();

    const response: GetAllAvatarsResponseDTO = {
      success: true,
      data: avatars.map(avatar => ({
        id: avatar.getId(),
        userId: avatar.getUserId(),
        experience: avatar.getExperienceValue(),
        level: avatar.getLevelValue(),
        coins: avatar.getCoinsValue(),
        streakDays: avatar.getStreakDaysValue(),
        createdAt: avatar.getCreatedAt().toISOString()
      })),
      message: 'Avatars retrieved successfully'
    };

    return response;
  }
} 