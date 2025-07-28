import { HabitDuelRepository } from '../../domain/repositories/HabitDuelRepository';
import { UserHabitRepository } from '../../domain/repositories/UserHabitRepository';
import { CreateHabitDuelDTO, HabitDuelResponseDTO } from '../dtos/HabitDuelDTO';
import { HabitDuelEntity } from '../../domain/entities/HabitDuelEntity';
import { IUUIDService } from '../../domain/services/IUUIDService';

export class CreateHabitDuelUseCase {
  constructor(
    private habitDuelRepository: HabitDuelRepository,
    private userHabitRepository: UserHabitRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(data: CreateHabitDuelDTO): Promise<HabitDuelResponseDTO> {
    // Verificar que el user habit existe
    const userHabit = await this.userHabitRepository.findById(data.userHabitId);
    if (!userHabit) {
      throw new Error('User habit not found');
    }

    // Verificar que no existe ya un duelo activo para este user habit
    const existingDuels = await this.habitDuelRepository.findByUserHabitId(data.userHabitId);
    const activeDuel = existingDuels.find(duel => duel.isActive() || duel.isPending());
    
    if (activeDuel) {
      throw new Error('There is already an active or pending duel for this habit');
    }

    // Verificar que el challenger y opponent son diferentes
    if (data.challengerId === data.opponentId) {
      throw new Error('Challenger and opponent cannot be the same user');
    }

    const duelId = this.uuidService.generate();
    
    const habitDuel = new HabitDuelEntity(
      duelId,
      data.userHabitId,
      data.challengerId,
      data.opponentId
    );

    const savedDuel = await this.habitDuelRepository.save(habitDuel);

    return {
      id: savedDuel.getId(),
      userHabitId: savedDuel.getUserHabitId(),
      challengerId: savedDuel.getChallengerId(),
      opponentId: savedDuel.getOpponentId(),
      streakChallenger: savedDuel.getStreakChallenger(),
      streakOpponent: savedDuel.getStreakOpponent(),
      status: savedDuel.getStatus(),
      createdAt: savedDuel.getCreatedAt(),
      completedAt: savedDuel.getCompletedAt(),
      winner: savedDuel.getWinner(),
      isTie: savedDuel.isTie(),
      durationInDays: savedDuel.getDurationInDays()
    };
  }
} 