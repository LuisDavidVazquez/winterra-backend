import { HabitRepository } from '../../domain/repositories/HabitRepository';
import { CreateHabitRequestDTO, CreateHabitResponseDTO } from '../dtos/HabitDTO';
import { IUUIDService } from '../../domain/services/IUUIDService';

export class CreateHabitUseCase {
  constructor(
    private habitRepository: HabitRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(data: CreateHabitRequestDTO): Promise<CreateHabitResponseDTO> {
    try {
      // Verificar si ya existe un hábito con ese nombre
      const existingHabit = await this.habitRepository.findByName(data.name);
      if (existingHabit) {
        throw new Error(`A habit with name '${data.name}' already exists`);
      }

      const habitId = this.uuidService.generate();
      
      const habit = new (await import('../../domain/entities/HabitEntity')).HabitEntity(
        habitId,
        data.name,
        data.categoryId,
        data.description || null
      );

      const savedHabit = await this.habitRepository.save(habit);

      const response: CreateHabitResponseDTO = {
        success: true,
        data: {
          id: savedHabit.getId(),
          name: savedHabit.getName().getValue(),
          categoryId: savedHabit.getCategoryId().getValue(),
          description: savedHabit.getDescription()
        },
        message: 'Habit created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create habit: ${error.message}`);
    }
  }
} 