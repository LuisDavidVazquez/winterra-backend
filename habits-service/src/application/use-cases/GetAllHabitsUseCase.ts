import { HabitRepository } from '../../domain/repositories/HabitRepository';
import { GetAllHabitsResponseDTO } from '../dtos/HabitDTO';

export class GetAllHabitsUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute(): Promise<GetAllHabitsResponseDTO> {
    try {
      const habits = await this.habitRepository.findAll();

      const response: GetAllHabitsResponseDTO = {
        success: true,
        data: habits.map(habit => ({
          id: habit.getId(),
          name: habit.getName().getValue(),
          categoryId: habit.getCategoryId().getValue(),
          description: habit.getDescription()
        })),
        message: 'Habits retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve habits: ${error.message}`);
    }
  }
} 