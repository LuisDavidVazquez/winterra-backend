import { AvatarRepository } from '../../domain/repositories/AvatarRepository';
import { GetAvatarResponseDTO } from '../dtos/AvatarDTO';

export class GetAvatarUseCase {
  constructor(private avatarRepository: AvatarRepository) {}

  async execute(userId: string): Promise<GetAvatarResponseDTO> {
    const avatar = await this.avatarRepository.findByUserId(userId);
    
    if (!avatar) {
      throw new Error('Avatar not found');
    }

    const response: GetAvatarResponseDTO = {
      success: true,
      data: {
        id: avatar.getId(),
        userId: avatar.getUserId(),
        experience: avatar.getExperienceValue(),
        level: avatar.getLevelValue(),
        coins: avatar.getCoinsValue(),
        streakDays: avatar.getStreakDaysValue(),
        createdAt: avatar.getCreatedAt().toISOString()
      },
      message: 'Avatar retrieved successfully'
    };

    return response;
  }
} 