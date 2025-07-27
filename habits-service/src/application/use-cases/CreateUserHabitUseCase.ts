import { UserHabitRepository } from '../../domain/repositories/UserHabitRepository';
import { CreateUserHabitRequestDTO, CreateUserHabitResponseDTO } from '../dtos/UserHabitDTO';
import { IUUIDService } from '../../domain/services/IUUIDService';

export class CreateUserHabitUseCase {
  constructor(
    private userHabitRepository: UserHabitRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(userId: string, data: CreateUserHabitRequestDTO): Promise<CreateUserHabitResponseDTO> {
    try {
      const habitId = this.uuidService.generate();
      
      const userHabit = new (await import('../../domain/entities/UserHabitEntity')).UserHabitEntity(
        habitId,
        userId,
        data.habitId || null,
        data.customName || null,
        data.customDescription || null,
        data.routineDays || '1111111'
      );

      const savedUserHabit = await this.userHabitRepository.save(userHabit);

      const response: CreateUserHabitResponseDTO = {
        success: true,
        data: {
          id: savedUserHabit.getId(),
          userId: savedUserHabit.getUserId(),
          habitId: savedUserHabit.getHabitId(),
          customName: savedUserHabit.getCustomName(),
          customDescription: savedUserHabit.getCustomDescription(),
          routineDays: savedUserHabit.getRoutineDays().getValue(),
          activeDayNames: savedUserHabit.getActiveDayNames(),
          createdAt: savedUserHabit.getCreatedAt().toISOString()
        },
        message: 'User habit created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create user habit: ${error.message}`);
    }
  }
} 