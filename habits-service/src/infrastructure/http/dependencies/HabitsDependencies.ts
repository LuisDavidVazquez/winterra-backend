// Controllers
import { CreateHabitTypeController } from '../controllers/CreateHabitTypeController';
import { GetAllHabitTypesController } from '../controllers/GetAllHabitTypesController';
import { CreateUserHabitController } from '../controllers/CreateUserHabitController';
import { GetUserHabitsController } from '../controllers/GetUserHabitsController';

// Use Cases
import { CreateHabitTypeUseCase } from '../../../application/use-cases/CreateHabitTypeUseCase';
import { GetAllHabitTypesUseCase } from '../../../application/use-cases/GetAllHabitTypesUseCase';
import { CreateUserHabitUseCase } from '../../../application/use-cases/CreateUserHabitUseCase';
import { GetUserHabitsUseCase } from '../../../application/use-cases/GetUserHabitsUseCase';

// Repositories
import { PostgreSQLHabitTypeRepository } from '../../repositories/PostgreSQL/HabitTypeRepository';
import { PostgreSQLUserHabitRepository } from '../../repositories/PostgreSQL/UserHabitRepository';

// Services
import { UUIDService } from '../../services/UUIDService';

// Repositories
export const habitTypeRepository = new PostgreSQLHabitTypeRepository();
export const userHabitRepository = new PostgreSQLUserHabitRepository();

// Services
export const uuidService = new UUIDService();

// Use Cases
export const createHabitTypeUseCase = new CreateHabitTypeUseCase(habitTypeRepository);
export const getAllHabitTypesUseCase = new GetAllHabitTypesUseCase(habitTypeRepository);
export const createUserHabitUseCase = new CreateUserHabitUseCase(userHabitRepository, uuidService);
export const getUserHabitsUseCase = new GetUserHabitsUseCase(userHabitRepository);

// Controllers
export const createHabitTypeController = new CreateHabitTypeController(createHabitTypeUseCase);
export const getAllHabitTypesController = new GetAllHabitTypesController(getAllHabitTypesUseCase);
export const createUserHabitController = new CreateUserHabitController(createUserHabitUseCase);
export const getUserHabitsController = new GetUserHabitsController(getUserHabitsUseCase); 