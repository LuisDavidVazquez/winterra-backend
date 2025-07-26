import { AvatarAccessoryEntity } from '../../domain/entities/AvatarAccessoryEntity';
import { AccessoryEntity } from '../../domain/entities/AccessoryEntity';
import { AvatarAccessoryRepository } from '../../domain/repositories/AvatarAccessoryRepository';
import { AccessoryRepository } from '../../domain/repositories/AccessoryRepository';
import { AvatarRepository } from '../../domain/repositories/AvatarRepository';
import { IUUIDService } from '../services/IUUIDService';
import { PurchaseAccessoryRequestDTO, PurchaseAccessoryResponseDTO } from '../dtos/AvatarAccessoryDTO';

export class PurchaseAccessoryUseCase {
  constructor(
    private avatarAccessoryRepository: AvatarAccessoryRepository,
    private accessoryRepository: AccessoryRepository,
    private avatarRepository: AvatarRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(userId: string, request: PurchaseAccessoryRequestDTO): Promise<PurchaseAccessoryResponseDTO> {
    try {
      // Get avatar to check coins
      const avatar = await this.avatarRepository.findByUserId(userId);
      if (!avatar) {
        throw new Error('Avatar not found');
      }

      // Get accessory
      const accessory = await this.accessoryRepository.findById(request.accessoryId);
      if (!accessory) {
        throw new Error('Accessory not found');
      }

      // Check if user already owns this accessory
      const existingOwnership = await this.avatarAccessoryRepository.findByUserIdAndAccessoryId(userId, request.accessoryId);
      if (existingOwnership) {
        throw new Error('User already owns this accessory');
      }

      // Check if user has enough coins
      if (!accessory.canBePurchasedWithCoins(avatar.getCoinsValue())) {
        throw new Error('Insufficient coins to purchase this accessory');
      }

      // Deduct coins from avatar
      const success = avatar.spendCoins(accessory.getPrice());
      if (!success) {
        throw new Error('Failed to spend coins');
      }
      await this.avatarRepository.update(avatar);

      // Create avatar accessory relationship
      const avatarAccessory = new AvatarAccessoryEntity(
        this.uuidService.generate(),
        userId,
        request.accessoryId,
        false, // Not equipped by default
        new Date()
      );

      const savedAvatarAccessory = await this.avatarAccessoryRepository.save(avatarAccessory);

      // Return response
      const response: PurchaseAccessoryResponseDTO = {
        success: true,
        data: {
          id: savedAvatarAccessory.getId(),
          userId: savedAvatarAccessory.getUserId(),
          accessoryId: savedAvatarAccessory.getAccessoryId(),
          accessoryName: accessory.getName(),
          accessoryType: accessory.getTypeValue(),
          accessoryTypeName: accessory.getTypeName(),
          accessoryRarity: accessory.getRarityValue(),
          accessoryRarityName: accessory.getRarityName(),
          accessoryPrice: accessory.getPrice(),
          isEquipped: savedAvatarAccessory.getIsEquipped(),
          unlockedAt: savedAvatarAccessory.getUnlockedAt().toISOString()
        },
        message: 'Accessory purchased successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to purchase accessory: ${error.message}`);
    }
  }
} 