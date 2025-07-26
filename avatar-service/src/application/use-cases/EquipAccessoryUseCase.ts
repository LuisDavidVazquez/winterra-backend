import { AvatarAccessoryEntity } from '../../domain/entities/AvatarAccessoryEntity';
import { AccessoryEntity } from '../../domain/entities/AccessoryEntity';
import { AvatarAccessoryRepository } from '../../domain/repositories/AvatarAccessoryRepository';
import { AccessoryRepository } from '../../domain/repositories/AccessoryRepository';
import { EquipAccessoryRequestDTO, EquipAccessoryResponseDTO } from '../dtos/AvatarAccessoryDTO';

export class EquipAccessoryUseCase {
  constructor(
    private avatarAccessoryRepository: AvatarAccessoryRepository,
    private accessoryRepository: AccessoryRepository
  ) {}

  async execute(userId: string, request: EquipAccessoryRequestDTO): Promise<EquipAccessoryResponseDTO> {
    try {
      // Get accessory to verify it exists
      const accessory = await this.accessoryRepository.findById(request.accessoryId);
      if (!accessory) {
        throw new Error('Accessory not found');
      }

      // Get user's accessory ownership
      const avatarAccessory = await this.avatarAccessoryRepository.findByUserIdAndAccessoryId(userId, request.accessoryId);
      if (!avatarAccessory) {
        throw new Error('User does not own this accessory');
      }

      // Unequip all accessories of the same type
      await this.avatarAccessoryRepository.unequipAllByType(userId, accessory.getTypeValue());

      // Equip the selected accessory
      const equippedAccessory = avatarAccessory.equip();
      const updatedAvatarAccessory = await this.avatarAccessoryRepository.update(equippedAccessory);

      // Return response
      const response: EquipAccessoryResponseDTO = {
        success: true,
        data: {
          id: updatedAvatarAccessory.getId(),
          userId: updatedAvatarAccessory.getUserId(),
          accessoryId: updatedAvatarAccessory.getAccessoryId(),
          accessoryName: accessory.getName(),
          accessoryType: accessory.getTypeValue(),
          accessoryTypeName: accessory.getTypeName(),
          accessoryRarity: accessory.getRarityValue(),
          accessoryRarityName: accessory.getRarityName(),
          accessoryPrice: accessory.getPrice(),
          isEquipped: updatedAvatarAccessory.getIsEquipped(),
          unlockedAt: updatedAvatarAccessory.getUnlockedAt().toISOString()
        },
        message: 'Accessory equipped successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to equip accessory: ${error.message}`);
    }
  }
} 