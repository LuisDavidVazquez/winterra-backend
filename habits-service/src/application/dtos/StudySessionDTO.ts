// Request DTOs
export interface CreateStudySessionRequestDTO {
  userHabitId: string;
  subject?: string;
  topic?: string;
  focusLevel?: number;
  notes?: string;
  durationMinutes?: number;
  startedAt?: string;
  endedAt?: string;
}

export interface UpdateStudySessionRequestDTO {
  subject?: string;
  topic?: string;
  focusLevel?: number;
  notes?: string;
  durationMinutes?: number;
  startedAt?: string;
  endedAt?: string;
}

// Response DTOs
export interface StudySessionResponseDTO {
  id: string;
  userHabitId: string;
  subject: string | null;
  topic: string | null;
  focusLevel: number | null;
  notes: string | null;
  durationMinutes: number | null;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
}

export interface CreateStudySessionResponseDTO {
  success: boolean;
  data: StudySessionResponseDTO;
  message: string;
}

export interface GetStudySessionResponseDTO {
  success: boolean;
  data: StudySessionResponseDTO | null;
  message: string;
}

export interface GetAllStudySessionsResponseDTO {
  success: boolean;
  data: StudySessionResponseDTO[];
  message: string;
} 