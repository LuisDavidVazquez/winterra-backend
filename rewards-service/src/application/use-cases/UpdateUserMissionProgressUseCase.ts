import { UserMissionRepository } from '../../domain/repositories/UserMissionRepository';
import { MissionRepository } from '../../domain/repositories/MissionRepository';
import { UpdateProgressDTO, UserMissionResponseDTO } from '../dtos/UserMissionDTO';

export class UpdateUserMissionProgressUseCase {
  constructor(
    private userMissionRepository: UserMissionRepository,
    private missionRepository: MissionRepository
  ) {}

  async execute(userMissionId: string, data: UpdateProgressDTO): Promise<UserMissionResponseDTO> {
    const userMission = await this.userMissionRepository.findById(userMissionId);
    
    if (!userMission) {
      throw new Error('User mission not found');
    }

    const mission = await this.missionRepository.findById(userMission.getMissionId());
    if (!mission) {
      throw new Error('Mission not found');
    }

    userMission.updateProgress(data.progress, mission.getObjective());
    const updatedUserMission = await this.userMissionRepository.update(userMission);

    return {
      id: updatedUserMission.getId(),
      userHabitsId: updatedUserMission.getUserHabitsId(),
      missionId: updatedUserMission.getMissionId(),
      status: updatedUserMission.getStatus(),
      progress: updatedUserMission.getProgress(),
      assignedAt: updatedUserMission.getAssignedAt(),
      completedAt: updatedUserMission.getCompletedAt(),
      progressPercentage: updatedUserMission.getProgressPercentage(mission.getObjective())
    };
  }
} 