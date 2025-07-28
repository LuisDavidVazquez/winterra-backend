import { UserMissionRepository } from '../../domain/repositories/UserMissionRepository';

export class DeleteUserMissionsByUserHabitsIdUseCase {
  constructor(private userMissionRepository: UserMissionRepository) {}

  async execute(userHabitsId: string): Promise<void> {
    // Verificar que existen misiones para este usuario
    const userMissions = await this.userMissionRepository.findByUserHabitsId(userHabitsId);
    
    if (userMissions.length === 0) {
      throw new Error('No user missions found for this user habits ID');
    }

    // Eliminar todas las misiones del usuario
    await this.userMissionRepository.deleteByUserHabitsId(userHabitsId);
  }
} 