import { HabitDuelRepository } from '../../domain/repositories/HabitDuelRepository';

export class DeleteHabitDuelUseCase {
  constructor(private habitDuelRepository: HabitDuelRepository) {}

  async execute(duelId: string): Promise<void> {
    const duel = await this.habitDuelRepository.findById(duelId);
    
    if (!duel) {
      throw new Error('Habit duel not found');
    }

    // Solo se pueden eliminar duelos pendientes o rechazados
    if (duel.isAccepted() || duel.isCompleted()) {
      throw new Error('Cannot delete accepted or completed duels');
    }

    await this.habitDuelRepository.delete(duelId);
  }
} 