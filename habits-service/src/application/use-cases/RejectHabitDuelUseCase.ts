import { HabitDuelRepository } from '../../domain/repositories/HabitDuelRepository';
import { RejectDuelDTO, HabitDuelResponseDTO } from '../dtos/HabitDuelDTO';

export class RejectHabitDuelUseCase {
  constructor(private habitDuelRepository: HabitDuelRepository) {}

  async execute(data: RejectDuelDTO): Promise<HabitDuelResponseDTO> {
    const duel = await this.habitDuelRepository.findById(data.duelId);
    
    if (!duel) {
      throw new Error('Habit duel not found');
    }

    // Verificar que el usuario que rechaza es el opponent
    if (duel.getOpponentId() !== data.opponentId) {
      throw new Error('Only the opponent can reject the duel');
    }

    // Verificar que el duelo está pendiente
    if (!duel.isPending()) {
      throw new Error('Duel is not in pending status');
    }

    duel.reject();
    const updatedDuel = await this.habitDuelRepository.update(duel);

    return {
      id: updatedDuel.getId(),
      userHabitId: updatedDuel.getUserHabitId(),
      challengerId: updatedDuel.getChallengerId(),
      opponentId: updatedDuel.getOpponentId(),
      streakChallenger: updatedDuel.getStreakChallenger(),
      streakOpponent: updatedDuel.getStreakOpponent(),
      status: updatedDuel.getStatus(),
      createdAt: updatedDuel.getCreatedAt(),
      completedAt: updatedDuel.getCompletedAt(),
      winner: updatedDuel.getWinner(),
      isTie: updatedDuel.isTie(),
      durationInDays: updatedDuel.getDurationInDays()
    };
  }
} 