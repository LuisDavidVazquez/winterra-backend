// Request DTOs
export interface CreateHabitRequestDTO {
  habitTypeId: number;
  habitCategoryId: number;
  description?: string;
}

export interface UpdateHabitRequestDTO {
  habitTypeId?: number;
  habitCategoryId?: number;
  description?: string;
}

// Response DTOs
export interface HabitResponseDTO {
  id: string;
  habitTypeId: number;
  habitCategoryId: number;
  description: string | null;
}

export interface CreateHabitResponseDTO {
  success: boolean;
  data: HabitResponseDTO;
  message: string;
}

export interface GetHabitResponseDTO {
  success: boolean;
  data: HabitResponseDTO | null;
  message: string;
}

export interface GetAllHabitsResponseDTO {
  success: boolean;
  data: HabitResponseDTO[];
  message: string;
} 