import { UserMissionRepository } from '../../domain/repositories/UserMissionRepository';
import { MissionRepository } from '../../domain/repositories/MissionRepository';
import { UserMissionResponseDTO, UserMissionListResponseDTO } from '../dtos/UserMissionDTO';

export class GetUserMissionsUseCase {
  constructor(
    private userMissionRepository: UserMissionRepository,
    private missionRepository: MissionRepository
  ) {}

  async execute(userHabitsId: string): Promise<UserMissionListResponseDTO> {
    const userMissions = await this.userMissionRepository.findByUserHabitsId(userHabitsId);

    const userMissionsDTO: UserMissionResponseDTO[] = [];
    
    for (const userMission of userMissions) {
      const mission = await this.missionRepository.findById(userMission.getMissionId());
      if (mission) {
        userMissionsDTO.push({
          id: userMission.getId(),
          userHabitsId: userMission.getUserHabitsId(),
          missionId: userMission.getMissionId(),
          status: userMission.getStatus(),
          progress: userMission.getProgress(),
          assignedAt: userMission.getAssignedAt(),
          completedAt: userMission.getCompletedAt(),
          progressPercentage: userMission.getProgressPercentage(mission.getObjective())
        });
      }
    }

    return {
      userMissions: userMissionsDTO,
      total: userMissionsDTO.length
    };
  }
} 