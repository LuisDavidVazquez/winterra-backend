import { GetAllUsersController } from '../controllers/GetAllUsersController';
import { FirebaseAuthController } from '../controllers/FirebaseAuthController';
import { GetAllUsersUseCase } from '../../../application/use-cases/GetAllUsersUseCase';
import { FirebaseAuthUseCase } from '../../../application/use-cases/FirebaseAuthUseCase';
import { PostgreSQLUserRepository } from '../../repositories/PostgreSQL';
import { UUIDService } from '../../services/UUIDService';
import { JWTService } from '../../services/JWTService';
import { UserEventService } from '../../events/UserEventService';
import { FirebaseService } from '../../services/FirebaseService';
import { EmailService } from '../../services/EmailService';

// Repositories
export const userRepository = new PostgreSQLUserRepository();

// Services
export const uuidService = new UUIDService();
export const jwtService = new JWTService();
export const firebaseService = new FirebaseService();
export const emailService = new EmailService();
export const userEventService = new UserEventService();

// Event Services
// export const userEventService = new UserEventService();

// Use Cases
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

export const firebaseAuthUseCase = new FirebaseAuthUseCase(
  userRepository,
  firebaseService,
  jwtService,
  uuidService,
  emailService,
  userEventService
);

// Controllers
export const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);
export const firebaseAuthController = new FirebaseAuthController(firebaseAuthUseCase);
