import { MissionRepository } from '../../domain/repositories/MissionRepository';
import { MissionResponseDTO, MissionListResponseDTO } from '../dtos/MissionDTO';

export class GetMissionsByHabitIdUseCase {
  constructor(private missionRepository: MissionRepository) {}

  async execute(habitId: number): Promise<MissionListResponseDTO> {
    const missions = await this.missionRepository.findByHabitId(habitId);

    const missionsDTO: MissionResponseDTO[] = missions.map(mission => ({
      id: mission.getId(),
      habitId: mission.getHabitId(),
      title: mission.getTitle(),
      description: mission.getDescription(),
      difficultyLevel: mission.getDifficultyLevel(),
      expReward: mission.getExpReward(),
      coinReward: mission.getCoinReward(),
      createdBySystem: mission.isCreatedBySystem(),
      createdAt: mission.getCreatedAt()
    }));

    return {
      missions: missionsDTO,
      total: missionsDTO.length
    };
  }
} 