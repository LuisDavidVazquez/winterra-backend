import { HabitDuelRepository } from '../../domain/repositories/HabitDuelRepository';
import { HabitDuelResponseDTO } from '../dtos/HabitDuelDTO';

export class GetHabitDuelByIdUseCase {
  constructor(private habitDuelRepository: HabitDuelRepository) {}

  async execute(duelId: string): Promise<HabitDuelResponseDTO> {
    const duel = await this.habitDuelRepository.findById(duelId);
    
    if (!duel) {
      throw new Error('Habit duel not found');
    }

    return {
      id: duel.getId(),
      userHabitId: duel.getUserHabitId(),
      challengerId: duel.getChallengerId(),
      opponentId: duel.getOpponentId(),
      streakChallenger: duel.getStreakChallenger(),
      streakOpponent: duel.getStreakOpponent(),
      status: duel.getStatus(),
      createdAt: duel.getCreatedAt(),
      completedAt: duel.getCompletedAt(),
      winner: duel.getWinner(),
      isTie: duel.isTie(),
      durationInDays: duel.getDurationInDays()
    };
  }
} 