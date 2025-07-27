import { HabitCategoryRepository } from '../../domain/repositories/HabitCategoryRepository';
import { CreateHabitCategoryRequestDTO, CreateHabitCategoryResponseDTO } from '../dtos/HabitCategoryDTO';

export class CreateHabitCategoryUseCase {
  constructor(private habitCategoryRepository: HabitCategoryRepository) {}

  async execute(data: CreateHabitCategoryRequestDTO): Promise<CreateHabitCategoryResponseDTO> {
    try {
      const habitCategory = new (await import('../../domain/entities/HabitCategoryEntity')).HabitCategoryEntity(
        0, // ID será generado por la base de datos
        data.name,
        data.color || null
      );

      const savedHabitCategory = await this.habitCategoryRepository.save(habitCategory);

      const response: CreateHabitCategoryResponseDTO = {
        success: true,
        data: {
          id: savedHabitCategory.getId().getValue(),
          name: savedHabitCategory.getName(),
          color: savedHabitCategory.getColor()
        },
        message: 'Habit category created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create habit category: ${error.message}`);
    }
  }
} 