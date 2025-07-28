import { MissionController } from '../controllers/MissionController';
import { UserMissionController } from '../controllers/UserMissionController';
import { CreateMissionUseCase } from '../../../application/use-cases/CreateMissionUseCase';
import { GetAllMissionsUseCase } from '../../../application/use-cases/GetAllMissionsUseCase';
import { GetMissionsByHabitIdUseCase } from '../../../application/use-cases/GetMissionsByHabitIdUseCase';
import { AssignMissionUseCase } from '../../../application/use-cases/AssignMissionUseCase';
import { UpdateUserMissionProgressUseCase } from '../../../application/use-cases/UpdateUserMissionProgressUseCase';
import { GetUserMissionsUseCase } from '../../../application/use-cases/GetUserMissionsUseCase';
import { DeleteUserMissionsByUserHabitsIdUseCase } from '../../../application/use-cases/DeleteUserMissionsByUserHabitsIdUseCase';
import { PostgreSQLMissionRepository } from '../../repositories/PostgreSQL/MissionRepository';
import { PostgreSQLUserMissionRepository } from '../../repositories/PostgreSQL/UserMissionRepository';
import { UUIDService } from '../../services/UUIDService';

// Repositories
export const missionRepository = new PostgreSQLMissionRepository();
export const userMissionRepository = new PostgreSQLUserMissionRepository();

// Services
export const uuidService = new UUIDService();

// Use Cases
export const createMissionUseCase = new CreateMissionUseCase(missionRepository, uuidService);
export const getAllMissionsUseCase = new GetAllMissionsUseCase(missionRepository);
export const getMissionsByHabitIdUseCase = new GetMissionsByHabitIdUseCase(missionRepository);
export const assignMissionUseCase = new AssignMissionUseCase(userMissionRepository, missionRepository, uuidService);
export const updateUserMissionProgressUseCase = new UpdateUserMissionProgressUseCase(userMissionRepository, missionRepository);
export const getUserMissionsUseCase = new GetUserMissionsUseCase(userMissionRepository, missionRepository);
export const deleteUserMissionsByUserHabitsIdUseCase = new DeleteUserMissionsByUserHabitsIdUseCase(userMissionRepository);

// Controllers
export const missionController = new MissionController(
  createMissionUseCase,
  getAllMissionsUseCase,
  getMissionsByHabitIdUseCase
);

export const userMissionController = new UserMissionController(
  assignMissionUseCase,
  updateUserMissionProgressUseCase,
  getUserMissionsUseCase,
  deleteUserMissionsByUserHabitsIdUseCase
); 