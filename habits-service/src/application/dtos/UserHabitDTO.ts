// Request DTOs
export interface CreateUserHabitRequestDTO {
  habitId?: string;
  customName?: string;
  customDescription?: string;
  routineDays?: string;
}

export interface UpdateUserHabitRequestDTO {
  habitId?: string;
  customName?: string;
  customDescription?: string;
  routineDays?: string;
}

// Response DTOs
export interface UserHabitResponseDTO {
  id: string;
  userId: string;
  habitId: string | null;
  customName: string | null;
  customDescription: string | null;
  routineDays: string;
  activeDayNames: string[];
  createdAt: string;
}

export interface CreateUserHabitResponseDTO {
  success: boolean;
  data: UserHabitResponseDTO;
  message: string;
}

export interface GetUserHabitResponseDTO {
  success: boolean;
  data: UserHabitResponseDTO | null;
  message: string;
}

export interface GetAllUserHabitsResponseDTO {
  success: boolean;
  data: UserHabitResponseDTO[];
  message: string;
} 