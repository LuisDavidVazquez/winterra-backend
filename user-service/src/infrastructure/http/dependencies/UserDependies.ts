import { CreateUserController } from '../controllers/CreateUserController';
import { GetAllUsersController } from '../controllers/GetAllUsersController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { CreateUserUseCase } from '../../../application/use-cases/CreateUserUseCase';
import { GetAllUsersUseCase } from '../../../application/use-cases/GetAllUsersUseCase';
import { AuthenticateUserUseCase } from '../../../application/use-cases/AuthenticateUserUseCase';
import { PostgreSQLUserRepository } from '../../repositories/PostgreSQL';
import { EncryptService } from '../../services/EncryptService';
import { UUIDService } from '../../services/UUIDService';
import { JWTService } from '../../services/JWTService';
import { UserEventService } from '../../events/UserEventService';

// Repositories
export const userRepository = new PostgreSQLUserRepository();

// Services
export const encryptService = new EncryptService();
export const uuidService = new UUIDService();
export const jwtService = new JWTService();
export const userEventService = new UserEventService();

// Use Cases
export const createUserUseCase = new CreateUserUseCase(
  userRepository, 
  encryptService, 
  uuidService, 
  userEventService
);

export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
export const authenticateUserUseCase = new AuthenticateUserUseCase(
  userRepository, 
  encryptService, 
  jwtService
);

// Controllers
export const createUserController = new CreateUserController(createUserUseCase);
export const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);
export const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

// Export all dependencies for easy access
export const userDependencies = {
  // Repositories
  userRepository,
  
  // Services
  encryptService,
  uuidService,
  jwtService,
  userEventService,
  
  // Use Cases
  createUserUseCase,
  getAllUsersUseCase,
  authenticateUserUseCase,
  
  // Controllers
  createUserController,
  getAllUsersController,
  authenticateUserController
};
