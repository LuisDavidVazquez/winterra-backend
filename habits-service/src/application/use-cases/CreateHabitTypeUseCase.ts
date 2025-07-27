import { HabitTypeRepository } from '../../domain/repositories/HabitTypeRepository';
import { CreateHabitTypeRequestDTO, CreateHabitTypeResponseDTO } from '../dtos/HabitTypeDTO';

export class CreateHabitTypeUseCase {
  constructor(private habitTypeRepository: HabitTypeRepository) {}

  async execute(data: CreateHabitTypeRequestDTO): Promise<CreateHabitTypeResponseDTO> {
    try {
      const habitType = new (await import('../../domain/entities/HabitTypeEntity')).HabitTypeEntity(
        0, // ID será generado por la base de datos
        data.name,
        data.description || null
      );

      const savedHabitType = await this.habitTypeRepository.save(habitType);

      const response: CreateHabitTypeResponseDTO = {
        success: true,
        data: {
          id: savedHabitType.getId().getValue(),
          name: savedHabitType.getName(),
          description: savedHabitType.getDescription()
        },
        message: 'Habit type created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create habit type: ${error.message}`);
    }
  }
} 