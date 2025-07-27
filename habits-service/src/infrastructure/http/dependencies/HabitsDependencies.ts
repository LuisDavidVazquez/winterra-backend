// Controllers
import { CreateHabitController } from '../controllers/CreateHabitController';
import { GetAllHabitsController } from '../controllers/GetAllHabitsController';
import { CreateHabitCategoryController } from '../controllers/CreateHabitCategoryController';
import { GetAllHabitCategoriesController } from '../controllers/GetAllHabitCategoriesController';
import { CreateUserHabitController } from '../controllers/CreateUserHabitController';
import { GetUserHabitsController } from '../controllers/GetUserHabitsController';
import { UpdateUserHabitController } from '../controllers/UpdateUserHabitController';
import { CreateStudySessionController } from '../controllers/CreateStudySessionController';
import { GetStudySessionsByUserHabitController } from '../controllers/GetStudySessionsByUserHabitController';
import { CreateSleepSessionController } from '../controllers/CreateSleepSessionController';
import { GetSleepSessionsByUserHabitController } from '../controllers/GetSleepSessionsByUserHabitController';

// Use Cases
import { CreateHabitUseCase } from '../../../application/use-cases/CreateHabitUseCase';
import { GetAllHabitsUseCase } from '../../../application/use-cases/GetAllHabitsUseCase';
import { CreateHabitCategoryUseCase } from '../../../application/use-cases/CreateHabitCategoryUseCase';
import { GetAllHabitCategoriesUseCase } from '../../../application/use-cases/GetAllHabitCategoriesUseCase';
import { CreateUserHabitUseCase } from '../../../application/use-cases/CreateUserHabitUseCase';
import { GetUserHabitsUseCase } from '../../../application/use-cases/GetUserHabitsUseCase';
import { UpdateUserHabitUseCase } from '../../../application/use-cases/UpdateUserHabitUseCase';
import { CreateStudySessionUseCase } from '../../../application/use-cases/CreateStudySessionUseCase';
import { GetStudySessionsByUserHabitUseCase } from '../../../application/use-cases/GetStudySessionsByUserHabitUseCase';
import { CreateSleepSessionUseCase } from '../../../application/use-cases/CreateSleepSessionUseCase';
import { GetSleepSessionsByUserHabitUseCase } from '../../../application/use-cases/GetSleepSessionsByUserHabitUseCase';

// Repositories
import { PostgreSQLHabitRepository } from '../../repositories/PostgreSQL/HabitRepository';
import { PostgreSQLHabitCategoryRepository } from '../../repositories/PostgreSQL/HabitCategoryRepository';
import { PostgreSQLUserHabitRepository } from '../../repositories/PostgreSQL/UserHabitRepository';
import { PostgreSQLStudySessionRepository } from '../../repositories/PostgreSQL/StudySessionRepository';
import { PostgreSQLSleepSessionRepository } from '../../repositories/PostgreSQL/SleepSessionRepository';

// Services
import { UUIDService } from '../../services/UUIDService';

// Repositories
export const habitRepository = new PostgreSQLHabitRepository();
export const habitCategoryRepository = new PostgreSQLHabitCategoryRepository();
export const userHabitRepository = new PostgreSQLUserHabitRepository();
export const studySessionRepository = new PostgreSQLStudySessionRepository();
export const sleepSessionRepository = new PostgreSQLSleepSessionRepository();

// Services
export const uuidService = new UUIDService();

// Use Cases
export const createHabitUseCase = new CreateHabitUseCase(habitRepository, uuidService);
export const getAllHabitsUseCase = new GetAllHabitsUseCase(habitRepository);
export const createHabitCategoryUseCase = new CreateHabitCategoryUseCase(habitCategoryRepository);
export const getAllHabitCategoriesUseCase = new GetAllHabitCategoriesUseCase(habitCategoryRepository);
export const createUserHabitUseCase = new CreateUserHabitUseCase(userHabitRepository, uuidService);
export const getUserHabitsUseCase = new GetUserHabitsUseCase(userHabitRepository);
export const updateUserHabitUseCase = new UpdateUserHabitUseCase(userHabitRepository);
export const createStudySessionUseCase = new CreateStudySessionUseCase(studySessionRepository, uuidService);
export const getStudySessionsByUserHabitUseCase = new GetStudySessionsByUserHabitUseCase(studySessionRepository);
export const createSleepSessionUseCase = new CreateSleepSessionUseCase(sleepSessionRepository, uuidService);
export const getSleepSessionsByUserHabitUseCase = new GetSleepSessionsByUserHabitUseCase(sleepSessionRepository);

// Controllers
export const createHabitController = new CreateHabitController(createHabitUseCase);
export const getAllHabitsController = new GetAllHabitsController(getAllHabitsUseCase);
export const createHabitCategoryController = new CreateHabitCategoryController(createHabitCategoryUseCase);
export const getAllHabitCategoriesController = new GetAllHabitCategoriesController(getAllHabitCategoriesUseCase);
export const createUserHabitController = new CreateUserHabitController(createUserHabitUseCase);
export const getUserHabitsController = new GetUserHabitsController(getUserHabitsUseCase);
export const updateUserHabitController = new UpdateUserHabitController(updateUserHabitUseCase);
export const createStudySessionController = new CreateStudySessionController(createStudySessionUseCase);
export const getStudySessionsByUserHabitController = new GetStudySessionsByUserHabitController(getStudySessionsByUserHabitUseCase);
export const createSleepSessionController = new CreateSleepSessionController(createSleepSessionUseCase);
export const getSleepSessionsByUserHabitController = new GetSleepSessionsByUserHabitController(getSleepSessionsByUserHabitUseCase); 