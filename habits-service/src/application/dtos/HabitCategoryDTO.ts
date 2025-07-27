// Request DTOs
export interface CreateHabitCategoryRequestDTO {
  name: string;
  color?: string;
}

export interface UpdateHabitCategoryRequestDTO {
  name?: string;
  color?: string;
}

// Response DTOs
export interface HabitCategoryResponseDTO {
  id: number;
  name: string;
  color: string | null;
}

export interface CreateHabitCategoryResponseDTO {
  success: boolean;
  data: HabitCategoryResponseDTO;
  message: string;
}

export interface GetHabitCategoryResponseDTO {
  success: boolean;
  data: HabitCategoryResponseDTO | null;
  message: string;
}

export interface GetAllHabitCategoriesResponseDTO {
  success: boolean;
  data: HabitCategoryResponseDTO[];
  message: string;
} 