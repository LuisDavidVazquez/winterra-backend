import { UserMissionRepository } from '../../domain/repositories/UserMissionRepository';
import { UserMissionResponseDTO, UserMissionListResponseDTO } from '../dtos/UserMissionDTO';

export class GetUserMissionsUseCase {
  constructor(private userMissionRepository: UserMissionRepository) {}

  async execute(userHabitsId: string): Promise<UserMissionListResponseDTO> {
    const userMissions = await this.userMissionRepository.findByUserHabitsId(userHabitsId);

    const userMissionsDTO: UserMissionResponseDTO[] = userMissions.map(userMission => ({
      id: userMission.getId(),
      userHabitsId: userMission.getUserHabitsId(),
      missionId: userMission.getMissionId(),
      status: userMission.getStatus(),
      progress: userMission.getProgress(),
      objective: userMission.getObjective(),
      assignedAt: userMission.getAssignedAt(),
      completedAt: userMission.getCompletedAt(),
      progressPercentage: userMission.getProgressPercentage()
    }));

    return {
      userMissions: userMissionsDTO,
      total: userMissionsDTO.length
    };
  }
} 