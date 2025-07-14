import { UserEntity } from '../../domain/entities/UserEntity';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserResponseDTO } from '../dtos/UserResponseDTO';

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDTO[]> {
    // Obtener todos los usuarios del repositorio
    const users = await this.userRepository.findAll();

    // Mapear las entidades a DTOs de respuesta
    const userDTOs: UserResponseDTO[] = users.map(user => ({
      id: user.getId(),
      name: user.getName().getValue(),
      email: user.getEmail().getValue(),
      plan: user.getPlan(),
      createdAt: user.getCreatedAt().toISOString(),
      lastSessionAt: user.getLastSessionAt()?.toISOString() || null
    }));

    return userDTOs;
  }
} 