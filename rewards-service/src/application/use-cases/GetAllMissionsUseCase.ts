import { MissionRepository } from '../../domain/repositories/MissionRepository';
import { MissionResponseDTO, MissionListResponseDTO } from '../dtos/MissionDTO';

export class GetAllMissionsUseCase {
  constructor(private missionRepository: MissionRepository) {}

  async execute(): Promise<MissionListResponseDTO> {
    const missions = await this.missionRepository.findAll();

    const missionsDTO: MissionResponseDTO[] = missions.map(mission => ({
      id: mission.getId(),
      habitId: mission.getHabitId(),
      title: mission.getTitle(),
      description: mission.getDescription(),
      difficultyLevel: mission.getDifficultyLevel(),
      expReward: mission.getExpReward(),
      coinReward: mission.getCoinReward(),
      objective: mission.getObjective(),
      createdBySystem: mission.isCreatedBySystem(),
      createdAt: mission.getCreatedAt()
    }));

    return {
      missions: missionsDTO,
      total: missionsDTO.length
    };
  }
} 