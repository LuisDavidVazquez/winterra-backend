import { AvatarRepository } from '../../domain/repositories/AvatarRepository';
import { AddExperienceRequestDTO, AddExperienceResponseDTO } from '../dtos/AvatarDTO';
import { AvatarEventService } from '../../infrastructure/events/AvatarEventService';

export class AddExperienceUseCase {
  constructor(
    private avatarRepository: AvatarRepository,
    private avatarEventService: AvatarEventService
  ) {}

  async execute(userId: string, data: AddExperienceRequestDTO): Promise<AddExperienceResponseDTO> {
    const avatar = await this.avatarRepository.findByUserId(userId);
    
    if (!avatar) {
      throw new Error('Avatar not found');
    }

    avatar.addExperience(data.amount);
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

    const response: AddExperienceResponseDTO = {
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
      message: 'Experience added successfully'
    };

    return response;
  }
} 