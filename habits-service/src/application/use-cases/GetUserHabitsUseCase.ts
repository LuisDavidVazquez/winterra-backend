import { UserHabitRepository } from '../../domain/repositories/UserHabitRepository';
import { GetAllUserHabitsResponseDTO } from '../dtos/UserHabitDTO';

export class GetUserHabitsUseCase {
  constructor(private userHabitRepository: UserHabitRepository) {}

  async execute(userId: string): Promise<GetAllUserHabitsResponseDTO> {
    try {
      const userHabits = await this.userHabitRepository.findByUserId(userId);

      const response: GetAllUserHabitsResponseDTO = {
        success: true,
        data: userHabits.map(userHabit => ({
          id: userHabit.getId(),
          userId: userHabit.getUserId(),
          habitId: userHabit.getHabitId(),
          customName: userHabit.getCustomName(),
          customDescription: userHabit.getCustomDescription(),
          routineDays: userHabit.getRoutineDays().getValue(),
          activeDayNames: userHabit.getActiveDayNames(),
          createdAt: userHabit.getCreatedAt().toISOString()
        })),
        message: 'User habits retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve user habits: ${error.message}`);
    }
  }
} 