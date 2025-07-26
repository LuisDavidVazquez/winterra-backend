// Request DTOs
export interface PurchaseAccessoryRequestDTO {
  accessoryId: string;
}

export interface EquipAccessoryRequestDTO {
  accessoryId: string;
}

export interface UnequipAccessoryRequestDTO {
  accessoryId: string;
}

// Response DTOs
export interface AvatarAccessoryResponseDTO {
  id: string;
  userId: string;
  accessoryId: string;
  accessoryName: string;
  accessoryType: number;
  accessoryTypeName: string;
  accessoryRarity: number;
  accessoryRarityName: string;
  accessoryPrice: number;
  isEquipped: boolean;
  unlockedAt: string;
}

export interface PurchaseAccessoryResponseDTO {
  success: boolean;
  data: AvatarAccessoryResponseDTO;
  message: string;
}

export interface GetUserAccessoriesResponseDTO {
  success: boolean;
  data: AvatarAccessoryResponseDTO[];
  message: string;
}

export interface EquipAccessoryResponseDTO {
  success: boolean;
  data: AvatarAccessoryResponseDTO;
  message: string;
}

export interface UnequipAccessoryResponseDTO {
  success: boolean;
  data: AvatarAccessoryResponseDTO;
  message: string;
}

export interface GetEquippedAccessoriesResponseDTO {
  success: boolean;
  data: AvatarAccessoryResponseDTO[];
  message: string;
} 