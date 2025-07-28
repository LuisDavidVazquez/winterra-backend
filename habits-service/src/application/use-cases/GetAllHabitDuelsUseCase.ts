import { HabitDuelRepository } from '../../domain/repositories/HabitDuelRepository';
import { HabitDuelResponseDTO, HabitDuelListResponseDTO } from '../dtos/HabitDuelDTO';

export class GetAllHabitDuelsUseCase {
  constructor(private habitDuelRepository: HabitDuelRepository) {}

  async execute(): Promise<HabitDuelListResponseDTO> {
    const duels = await this.habitDuelRepository.findAll();

    const duelsDTO: HabitDuelResponseDTO[] = duels.map(duel => ({
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
    }));

    return {
      duels: duelsDTO,
      total: duelsDTO.length
    };
  }
} 