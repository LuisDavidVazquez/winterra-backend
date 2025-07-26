import { AccessoryRepository } from '../../domain/repositories/AccessoryRepository';
import { GetAllAccessoriesResponseDTO } from '../dtos/AccessoryDTO';

export class GetAllAccessoriesUseCase {
  constructor(private accessoryRepository: AccessoryRepository) {}

  async execute(): Promise<GetAllAccessoriesResponseDTO> {
    try {
      const accessories = await this.accessoryRepository.findAll();

      const response: GetAllAccessoriesResponseDTO = {
        success: true,
        data: accessories.map(accessory => ({
          id: accessory.getId(),
          name: accessory.getName(),
          type: accessory.getTypeValue(),
          typeName: accessory.getTypeName(),
          price: accessory.getPrice(),
          rarity: accessory.getRarityValue(),
          rarityName: accessory.getRarityName(),
          createdAt: accessory.getCreatedAt().toISOString()
        })),
        message: 'Accessories retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve accessories: ${error.message}`);
    }
  }
} 