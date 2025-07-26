import { AccessoryEntity } from '../../domain/entities/AccessoryEntity';
import { AccessoryRepository } from '../../domain/repositories/AccessoryRepository';
import { IUUIDService } from '../services/IUUIDService';
import { CreateAccessoryRequestDTO, CreateAccessoryResponseDTO } from '../dtos/AccessoryDTO';
import { AccessoryType } from '../../domain/value-objects/AccessoryType';
import { Rarity } from '../../domain/value-objects/Rarity';

export class CreateAccessoryUseCase {
  constructor(
    private accessoryRepository: AccessoryRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(request: CreateAccessoryRequestDTO): Promise<CreateAccessoryResponseDTO> {
    try {
      // Validate input
      if (!request.name || request.name.trim().length === 0) {
        throw new Error('Accessory name is required');
      }

      if (request.price < 0) {
        throw new Error('Accessory price cannot be negative');
      }

      // Create value objects
      const type = new AccessoryType(request.type);
      const rarity = new Rarity(request.rarity);

      // Generate UUID
      const id = this.uuidService.generate();

      // Create accessory entity
      const accessory = new AccessoryEntity(
        id,
        request.name.trim(),
        type,
        request.price,
        rarity,
        new Date()
      );

      // Save to repository
      const savedAccessory = await this.accessoryRepository.save(accessory);

      // Return response
      const response: CreateAccessoryResponseDTO = {
        success: true,
        data: {
          id: savedAccessory.getId(),
          name: savedAccessory.getName(),
          type: savedAccessory.getTypeValue(),
          typeName: savedAccessory.getTypeName(),
          price: savedAccessory.getPrice(),
          rarity: savedAccessory.getRarityValue(),
          rarityName: savedAccessory.getRarityName(),
          createdAt: savedAccessory.getCreatedAt().toISOString()
        },
        message: 'Accessory created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create accessory: ${error.message}`);
    }
  }
} 