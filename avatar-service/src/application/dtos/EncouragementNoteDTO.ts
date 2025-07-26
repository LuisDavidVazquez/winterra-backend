// Request DTOs
export interface CreateEncouragementNoteRequestDTO {
  avatarId: string;
  content: string;
}

export interface UpdateEncouragementNoteRequestDTO {
  content: string;
}

// Response DTOs
export interface EncouragementNoteResponseDTO {
  id: string;
  avatarId: string;
  content: string;
  createdAt: string;
  contentLength: number;
  isShortNote: boolean;
  isLongNote: boolean;
  contentPreview: string;
}

export interface CreateEncouragementNoteResponseDTO {
  success: boolean;
  data: EncouragementNoteResponseDTO;
  message: string;
}

export interface GetEncouragementNoteResponseDTO {
  success: boolean;
  data: EncouragementNoteResponseDTO | null;
  message: string;
}

export interface GetAllEncouragementNotesResponseDTO {
  success: boolean;
  data: EncouragementNoteResponseDTO[];
  message: string;
}

export interface GetAvatarEncouragementNotesResponseDTO {
  success: boolean;
  data: EncouragementNoteResponseDTO[];
  message: string;
}

export interface UpdateEncouragementNoteResponseDTO {
  success: boolean;
  data: EncouragementNoteResponseDTO;
  message: string;
}

export interface DeleteEncouragementNoteResponseDTO {
  success: boolean;
  data: null;
  message: string;
} 