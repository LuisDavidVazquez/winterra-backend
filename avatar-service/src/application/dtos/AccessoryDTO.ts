// Request DTOs
export interface CreateAccessoryRequestDTO {
  name: string;
  type: number;
  price: number;
  rarity: number;
}

export interface UpdateAccessoryRequestDTO {
  name?: string;
  type?: number;
  price?: number;
  rarity?: number;
}

// Response DTOs
export interface AccessoryResponseDTO {
  id: string;
  name: string;
  type: number;
  typeName: string;
  price: number;
  rarity: number;
  rarityName: string;
  createdAt: string;
}

export interface CreateAccessoryResponseDTO {
  success: boolean;
  data: AccessoryResponseDTO;
  message: string;
}

export interface GetAccessoryResponseDTO {
  success: boolean;
  data: AccessoryResponseDTO | null;
  message: string;
}

export interface GetAllAccessoriesResponseDTO {
  success: boolean;
  data: AccessoryResponseDTO[];
  message: string;
}

export interface UpdateAccessoryResponseDTO {
  success: boolean;
  data: AccessoryResponseDTO;
  message: string;
}

export interface DeleteAccessoryResponseDTO {
  success: boolean;
  data: null;
  message: string;
} 