import { AvatarRepository } from '../../domain/repositories/AvatarRepository';
import { SpendCoinsRequestDTO, SpendCoinsResponseDTO } from '../dtos/AvatarDTO';
import { AvatarEventService } from '../../infrastructure/events/AvatarEventService';

export class SpendCoinsUseCase {
  constructor(
    private avatarRepository: AvatarRepository,
    private avatarEventService: AvatarEventService
  ) {}

  async execute(userId: string, data: SpendCoinsRequestDTO): Promise<SpendCoinsResponseDTO> {
    const avatar = await this.avatarRepository.findByUserId(userId);
    
    if (!avatar) {
      throw new Error('Avatar not found');
    }

    const success = avatar.spendCoins(data.amount);
    
    if (!success) {
      const response: SpendCoinsResponseDTO = {
        success: false,
        data: {
          id: avatar.getId(),
          userId: avatar.getUserId(),
          experience: avatar.getExperienceValue(),
          level: avatar.getLevelValue(),
          coins: avatar.getCoinsValue(),
          streakDays: avatar.getStreakDaysValue(),
          createdAt: avatar.getCreatedAt().toISOString()
        },
        message: 'Insufficient coins',
        insufficientFunds: true
      };
      return response;
    }

    const updatedAvatar = await this.avatarRepository.update(avatar);

    // Publish avatar updated event
    try {
      await this.avatarEventService.publishAvatarUpdatedEvent({
        id: updatedAvatar.getId(),
        userId: updatedAvatar.getUserId(),
        experience: updatedAvatar.getExperienceValue(),
        level: updatedAvatar.getLevelValue(),
        coins: updatedAvatar.getCoinsValue(),
        streakDays: updatedAvatar.getStreakDaysValue(),
        updatedAt: new Date()
      });
      console.log('Evento de avatar actualizado publicado exitosamente');
    } catch (error) {
      console.error('Error publicando evento de avatar actualizado:', error);
      // No fallar la actualización si el evento falla
    }

    const response: SpendCoinsResponseDTO = {
      success: true,
      data: {
        id: updatedAvatar.getId(),
        userId: updatedAvatar.getUserId(),
        experience: updatedAvatar.getExperienceValue(),
        level: updatedAvatar.getLevelValue(),
        coins: updatedAvatar.getCoinsValue(),
        streakDays: updatedAvatar.getStreakDaysValue(),
        createdAt: updatedAvatar.getCreatedAt().toISOString()
      },
      message: 'Coins spent successfully'
    };

    return response;
  }
} 