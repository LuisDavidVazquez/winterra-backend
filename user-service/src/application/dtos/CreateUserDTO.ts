export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  plan?: number; // 1 = normal, 2 = pro
}
