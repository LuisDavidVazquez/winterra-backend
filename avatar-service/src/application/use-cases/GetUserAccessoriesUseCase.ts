import { AvatarAccessoryRepository } from '../../domain/repositories/AvatarAccessoryRepository';
import { AccessoryRepository } from '../../domain/repositories/AccessoryRepository';
import { GetUserAccessoriesResponseDTO } from '../dtos/AvatarAccessoryDTO';

export class GetUserAccessoriesUseCase {
  constructor(
    private avatarAccessoryRepository: AvatarAccessoryRepository,
    private accessoryRepository: AccessoryRepository
  ) {}

  async execute(userId: string): Promise<GetUserAccessoriesResponseDTO> {
    try {
      const userAccessories = await this.avatarAccessoryRepository.findByUserId(userId);
      
      // Get accessory details for each user accessory
      const accessoriesWithDetails = await Promise.all(
        userAccessories.map(async (userAccessory) => {
          const accessory = await this.accessoryRepository.findById(userAccessory.getAccessoryId());
          if (!accessory) {
            throw new Error(`Accessory ${userAccessory.getAccessoryId()} not found`);
          }

          return {
            id: userAccessory.getId(),
            userId: userAccessory.getUserId(),
            accessoryId: userAccessory.getAccessoryId(),
            accessoryName: accessory.getName(),
            accessoryType: accessory.getTypeValue(),
            accessoryTypeName: accessory.getTypeName(),
            accessoryRarity: accessory.getRarityValue(),
            accessoryRarityName: accessory.getRarityName(),
            accessoryPrice: accessory.getPrice(),
            isEquipped: userAccessory.getIsEquipped(),
            unlockedAt: userAccessory.getUnlockedAt().toISOString()
          };
        })
      );

      const response: GetUserAccessoriesResponseDTO = {
        success: true,
        data: accessoriesWithDetails,
        message: 'User accessories retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve user accessories: ${error.message}`);
    }
  }
} 