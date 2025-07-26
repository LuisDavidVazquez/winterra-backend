import { AvatarRepository } from '../../domain/repositories/AvatarRepository';
import { AvatarEntity } from '../../domain/entities/AvatarEntity';
import { CreateAvatarRequestDTO, CreateAvatarResponseDTO } from '../dtos/AvatarDTO';
import { IUUIDService } from '../services/IUUIDService';
import { AvatarEventService } from '../../infrastructure/events/AvatarEventService';

export class CreateAvatarUseCase {
  constructor(
    private avatarRepository: AvatarRepository,
    private uuidService: IUUIDService,
    private avatarEventService: AvatarEventService
  ) {}

  async execute(data: CreateAvatarRequestDTO): Promise<CreateAvatarResponseDTO> {
    // Check if avatar already exists for this user
    const existingAvatar = await this.avatarRepository.findByUserId(data.userId);
    if (existingAvatar) {
      throw new Error('Avatar already exists for this user');
    }

    // Create new avatar
    const avatar = new AvatarEntity(
      this.uuidService.generate(),
      data.userId,
      data.experience || 0,
      data.level || 1,
      data.coins || 0,
      data.streakDays || 0
    );

    const savedAvatar = await this.avatarRepository.save(avatar);

    // Publish avatar created event
    try {
      await this.avatarEventService.publishAvatarCreatedEvent({
        id: savedAvatar.getId(),
        userId: savedAvatar.getUserId(),
        experience: savedAvatar.getExperienceValue(),
        level: savedAvatar.getLevelValue(),
        coins: savedAvatar.getCoinsValue(),
        streakDays: savedAvatar.getStreakDaysValue(),
        createdAt: savedAvatar.getCreatedAt()
      });
      console.log('Evento de avatar creado publicado exitosamente');
    } catch (error) {
      console.error('Error publicando evento de avatar creado:', error);
      // No fallar la creación si el evento falla
    }

    const response: CreateAvatarResponseDTO = {
      success: true,
      data: {
        id: savedAvatar.getId(),
        userId: savedAvatar.getUserId(),
        experience: savedAvatar.getExperienceValue(),
        level: savedAvatar.getLevelValue(),
        coins: savedAvatar.getCoinsValue(),
        streakDays: savedAvatar.getStreakDaysValue(),
        createdAt: savedAvatar.getCreatedAt().toISOString()
      },
      message: 'Avatar created successfully'
    };

    return response;
  }
} 