import { UserMissionRepository } from '../../domain/repositories/UserMissionRepository';
import { MissionRepository } from '../../domain/repositories/MissionRepository';
import { AssignMissionDTO, UserMissionResponseDTO } from '../dtos/UserMissionDTO';
import { UserMissionEntity } from '../../domain/entities/UserMissionEntity';
import { UUIDService } from '../../infrastructure/services/UUIDService';

export class AssignMissionUseCase {
  constructor(
    private userMissionRepository: UserMissionRepository,
    private missionRepository: MissionRepository,
    private uuidService: UUIDService
  ) {}

  async execute(data: AssignMissionDTO): Promise<UserMissionResponseDTO> {
    // Verificar que la misión existe
    const mission = await this.missionRepository.findById(data.missionId);
    if (!mission) {
      throw new Error('Mission not found');
    }

    // Verificar que no existe ya una asignación para este usuario y misión
    const existingUserMissions = await this.userMissionRepository.findByUserHabitsId(data.userHabitsId);
    const existingAssignment = existingUserMissions.find(um => um.getMissionId() === data.missionId);
    
    if (existingAssignment) {
      throw new Error('Mission already assigned to this user');
    }

    const userMissionId = this.uuidService.generate();
    
    const userMission = new UserMissionEntity(
      userMissionId,
      data.userHabitsId,
      data.missionId,
      data.objective
    );

    const savedUserMission = await this.userMissionRepository.save(userMission);

    return {
      id: savedUserMission.getId(),
      userHabitsId: savedUserMission.getUserHabitsId(),
      missionId: savedUserMission.getMissionId(),
      status: savedUserMission.getStatus(),
      progress: savedUserMission.getProgress(),
      objective: savedUserMission.getObjective(),
      assignedAt: savedUserMission.getAssignedAt(),
      completedAt: savedUserMission.getCompletedAt(),
      progressPercentage: savedUserMission.getProgressPercentage()
    };
  }
} 