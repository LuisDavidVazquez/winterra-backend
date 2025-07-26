// Request DTOs
export interface CreateAvatarRequestDTO {
  userId: string;
  experience?: number;
  level?: number;
  coins?: number;
  streakDays?: number;
}

export interface UpdateAvatarRequestDTO {
  experience?: number;
  level?: number;
  coins?: number;
  streakDays?: number;
}

export interface AddExperienceRequestDTO {
  amount: number;
}

export interface AddCoinsRequestDTO {
  amount: number;
}

export interface SpendCoinsRequestDTO {
  amount: number;
}

// Response DTOs
export interface AvatarResponseDTO {
  id: string;
  userId: string;
  experience: number;
  level: number;
  coins: number;
  streakDays: number;
  createdAt: string;
}

export interface CreateAvatarResponseDTO {
  success: boolean;
  data: AvatarResponseDTO;
  message: string;
}

export interface GetAvatarResponseDTO {
  success: boolean;
  data: AvatarResponseDTO;
  message: string;
}

export interface GetAllAvatarsResponseDTO {
  success: boolean;
  data: AvatarResponseDTO[];
  message: string;
}

export interface UpdateAvatarResponseDTO {
  success: boolean;
  data: AvatarResponseDTO;
  message: string;
}

export interface AddExperienceResponseDTO {
  success: boolean;
  data: AvatarResponseDTO;
  message: string;
}

export interface AddCoinsResponseDTO {
  success: boolean;
  data: AvatarResponseDTO;
  message: string;
}

export interface SpendCoinsResponseDTO {
  success: boolean;
  data: AvatarResponseDTO;
  message: string;
  insufficientFunds?: boolean;
} 