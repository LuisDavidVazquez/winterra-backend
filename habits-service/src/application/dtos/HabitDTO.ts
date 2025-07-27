// Request DTOs
export interface CreateHabitRequestDTO {
  name: string;
  categoryId: number;
  description?: string;
}

export interface UpdateHabitRequestDTO {
  name?: string;
  categoryId?: number;
  description?: string;
}

// Response DTOs
export interface HabitResponseDTO {
  id: string;
  name: string;
  categoryId: number;
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