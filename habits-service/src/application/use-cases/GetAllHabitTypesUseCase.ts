import { HabitTypeRepository } from '../../domain/repositories/HabitTypeRepository';
import { GetAllHabitTypesResponseDTO } from '../dtos/HabitTypeDTO';

export class GetAllHabitTypesUseCase {
  constructor(private habitTypeRepository: HabitTypeRepository) {}

  async execute(): Promise<GetAllHabitTypesResponseDTO> {
    try {
      const habitTypes = await this.habitTypeRepository.findAll();

      const response: GetAllHabitTypesResponseDTO = {
        success: true,
        data: habitTypes.map(habitType => ({
          id: habitType.getId().getValue(),
          name: habitType.getName(),
          description: habitType.getDescription()
        })),
        message: 'Habit types retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve habit types: ${error.message}`);
    }
  }
} 