import { UserMissionRepository } from '../../domain/repositories/UserMissionRepository';
import { UpdateProgressDTO, UserMissionResponseDTO } from '../dtos/UserMissionDTO';

export class UpdateUserMissionProgressUseCase {
  constructor(private userMissionRepository: UserMissionRepository) {}

  async execute(userMissionId: string, data: UpdateProgressDTO): Promise<UserMissionResponseDTO> {
    const userMission = await this.userMissionRepository.findById(userMissionId);
    
    if (!userMission) {
      throw new Error('User mission not found');
    }

    userMission.updateProgress(data.progress);
    const updatedUserMission = await this.userMissionRepository.update(userMission);

    return {
      id: updatedUserMission.getId(),
      userHabitsId: updatedUserMission.getUserHabitsId(),
      missionId: updatedUserMission.getMissionId(),
      status: updatedUserMission.getStatus(),
      progress: updatedUserMission.getProgress(),
      objective: updatedUserMission.getObjective(),
      assignedAt: updatedUserMission.getAssignedAt(),
      completedAt: updatedUserMission.getCompletedAt(),
      progressPercentage: updatedUserMission.getProgressPercentage()
    };
  }
} 