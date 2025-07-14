export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  plan: number;
  createdAt: string;
  lastSessionAt: string | null;
}

export interface GetAllUsersResponseDTO {
  success: boolean;
  data: UserResponseDTO[];
  message: string;
  total: number;
} 