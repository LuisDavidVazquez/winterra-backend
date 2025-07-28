import { HabitDuelRepository } from '../../domain/repositories/HabitDuelRepository';
import { CompleteDuelDTO, HabitDuelResponseDTO } from '../dtos/HabitDuelDTO';

export class CompleteHabitDuelUseCase {
  constructor(private habitDuelRepository: HabitDuelRepository) {}

  async execute(data: CompleteDuelDTO): Promise<HabitDuelResponseDTO> {
    const duel = await this.habitDuelRepository.findById(data.duelId);
    
    if (!duel) {
      throw new Error('Habit duel not found');
    }

    // Verificar que el usuario que completa es el challenger o opponent
    if (duel.getChallengerId() !== data.userId && duel.getOpponentId() !== data.userId) {
      throw new Error('Only the challenger or opponent can complete the duel');
    }

    // Verificar que el duelo está aceptado
    if (!duel.isAccepted()) {
      throw new Error('Duel is not in accepted status');
    }

    // Actualizar streaks
    duel.updateStreakChallenger(data.streakChallenger);
    duel.updateStreakOpponent(data.streakOpponent);

    // Completar el duelo
    duel.complete();
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