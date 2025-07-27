import { MissionRepository } from '../../domain/repositories/MissionRepository';
import { CreateMissionDTO, MissionResponseDTO } from '../dtos/MissionDTO';
import { MissionEntity } from '../../domain/entities/MissionEntity';
import { UUIDService } from '../../infrastructure/services/UUIDService';

export class CreateMissionUseCase {
  constructor(
    private missionRepository: MissionRepository,
    private uuidService: UUIDService
  ) {}

  async execute(data: CreateMissionDTO): Promise<MissionResponseDTO> {
    const missionId = this.uuidService.generate();
    
    const mission = new MissionEntity(
      missionId,
      data.habitId,
      data.title,
      data.description,
      data.difficultyLevel,
      data.expReward,
      data.coinReward,
      data.createdBySystem ?? true
    );

    const savedMission = await this.missionRepository.save(mission);

    return {
      id: savedMission.getId(),
      habitId: savedMission.getHabitId(),
      title: savedMission.getTitle(),
      description: savedMission.getDescription(),
      difficultyLevel: savedMission.getDifficultyLevel(),
      expReward: savedMission.getExpReward(),
      coinReward: savedMission.getCoinReward(),
      createdBySystem: savedMission.isCreatedBySystem(),
      createdAt: savedMission.getCreatedAt()
    };
  }
} 