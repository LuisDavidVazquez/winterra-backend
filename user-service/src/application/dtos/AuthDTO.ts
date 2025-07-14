export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      plan: number;
    };
    token: string;
    expiresIn: string;
  };
  message: string;
} 