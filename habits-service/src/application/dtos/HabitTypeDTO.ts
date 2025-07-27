// Request DTOs
export interface CreateHabitTypeRequestDTO {
  name: string;
  description?: string;
}

export interface UpdateHabitTypeRequestDTO {
  name?: string;
  description?: string;
}

// Response DTOs
export interface HabitTypeResponseDTO {
  id: number;
  name: string;
  description: string | null;
}

export interface CreateHabitTypeResponseDTO {
  success: boolean;
  data: HabitTypeResponseDTO;
  message: string;
}

export interface GetHabitTypeResponseDTO {
  success: boolean;
  data: HabitTypeResponseDTO | null;
  message: string;
}

export interface GetAllHabitTypesResponseDTO {
  success: boolean;
  data: HabitTypeResponseDTO[];
  message: string;
} 