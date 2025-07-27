import { HabitCategoryRepository } from '../../domain/repositories/HabitCategoryRepository';
import { GetAllHabitCategoriesResponseDTO } from '../dtos/HabitCategoryDTO';

export class GetAllHabitCategoriesUseCase {
  constructor(private habitCategoryRepository: HabitCategoryRepository) {}

  async execute(): Promise<GetAllHabitCategoriesResponseDTO> {
    try {
      const habitCategories = await this.habitCategoryRepository.findAll();

      const response: GetAllHabitCategoriesResponseDTO = {
        success: true,
        data: habitCategories.map(habitCategory => ({
          id: habitCategory.getId().getValue(),
          name: habitCategory.getName(),
          color: habitCategory.getColor()
        })),
        message: 'Habit categories retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve habit categories: ${error.message}`);
    }
  }
} 