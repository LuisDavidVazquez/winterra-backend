// Request DTOs
export interface CreateSleepSessionRequestDTO {
  userHabitId: string;
  sleepTime: string; // formato: "HH:MM"
  wakeUpTime: string; // formato: "HH:MM"
  totalHours?: number;
  sleepQuality?: string; // "buena", "media", "mala"
  notes?: string;
}

export interface UpdateSleepSessionRequestDTO {
  sleepTime?: string;
  wakeUpTime?: string;
  totalHours?: number;
  sleepQuality?: string;
  notes?: string;
}

// Response DTOs
export interface SleepSessionResponseDTO {
  id: string;
  userHabitId: string;
  sleepTime: string;
  wakeUpTime: string;
  totalHours: number | null;
  sleepQuality: string | null;
  notes: string | null;
  createdAt: string;
}

export interface CreateSleepSessionResponseDTO {
  success: boolean;
  data: SleepSessionResponseDTO;
  message: string;
}

export interface GetSleepSessionResponseDTO {
  success: boolean;
  data: SleepSessionResponseDTO | null;
  message: string;
}

export interface GetAllSleepSessionsResponseDTO {
  success: boolean;
  data: SleepSessionResponseDTO[];
  message: string;
} 