import { UserHabitRepository } from '../../domain/repositories/UserHabitRepository';
import { UpdateUserHabitRequestDTO, GetUserHabitResponseDTO } from '../dtos/UserHabitDTO';

export class UpdateUserHabitUseCase {
  constructor(private userHabitRepository: UserHabitRepository) {}

  async execute(userHabitId: string, data: UpdateUserHabitRequestDTO): Promise<GetUserHabitResponseDTO> {
    try {
      const existingUserHabit = await this.userHabitRepository.findById(userHabitId);
      
      if (!existingUserHabit) {
        throw new Error('User habit not found');
      }

      // Update fields if provided
      if (data.habitId !== undefined) {
        existingUserHabit.updateHabitId(data.habitId);
      }
      
      if (data.name !== undefined) {
        existingUserHabit.updateName(data.name);
      }
      
      if (data.description !== undefined) {
        existingUserHabit.updateDescription(data.description);
      }
      
      if (data.routineDays !== undefined) {
        existingUserHabit.updateRoutineDays(data.routineDays);
      }

      const updatedUserHabit = await this.userHabitRepository.update(existingUserHabit);

      const response: GetUserHabitResponseDTO = {
        success: true,
        data: {
          id: updatedUserHabit.getId(),
          userId: updatedUserHabit.getUserId(),
          habitId: updatedUserHabit.getHabitId(),
          name: updatedUserHabit.getName(),
          description: updatedUserHabit.getDescription(),
          routineDays: updatedUserHabit.getRoutineDays().getValue(),
          activeDayNames: updatedUserHabit.getActiveDayNames(),
          createdAt: updatedUserHabit.getCreatedAt().toISOString()
        },
        message: 'User habit updated successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to update user habit: ${error.message}`);
    }
  }
} 