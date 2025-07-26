import { CreateAvatarController } from '../controllers/CreateAvatarController';
import { GetAvatarController } from '../controllers/GetAvatarController';
import { GetAllAvatarsController } from '../controllers/GetAllAvatarsController';
import { AddExperienceController } from '../controllers/AddExperienceController';
import { AddCoinsController } from '../controllers/AddCoinsController';
import { SpendCoinsController } from '../controllers/SpendCoinsController';

// Accessory Controllers
import { CreateAccessoryController } from '../controllers/CreateAccessoryController';
import { GetAllAccessoriesController } from '../controllers/GetAllAccessoriesController';
import { PurchaseAccessoryController } from '../controllers/PurchaseAccessoryController';
import { EquipAccessoryController } from '../controllers/EquipAccessoryController';
import { GetUserAccessoriesController } from '../controllers/GetUserAccessoriesController';

// Achievement Controllers
import { CreateAchievementController } from '../controllers/CreateAchievementController';
import { GetAllAchievementsController } from '../controllers/GetAllAchievementsController';
import { UnlockAchievementController } from '../controllers/UnlockAchievementController';
import { GetUserAchievementsController } from '../controllers/GetUserAchievementsController';

// Encouragement Note Controllers
import { CreateEncouragementNoteController } from '../controllers/CreateEncouragementNoteController';
import { GetAvatarEncouragementNotesController } from '../controllers/GetAvatarEncouragementNotesController';
import { GetAllEncouragementNotesController } from '../controllers/GetAllEncouragementNotesController';

import { CreateAvatarUseCase } from '../../../application/use-cases/CreateAvatarUseCase';
import { GetAvatarUseCase } from '../../../application/use-cases/GetAvatarUseCase';
import { GetAllAvatarsUseCase } from '../../../application/use-cases/GetAllAvatarsUseCase';
import { AddExperienceUseCase } from '../../../application/use-cases/AddExperienceUseCase';
import { AddCoinsUseCase } from '../../../application/use-cases/AddCoinsUseCase';
import { SpendCoinsUseCase } from '../../../application/use-cases/SpendCoinsUseCase';

// Accessory Use Cases
import { CreateAccessoryUseCase } from '../../../application/use-cases/CreateAccessoryUseCase';
import { GetAllAccessoriesUseCase } from '../../../application/use-cases/GetAllAccessoriesUseCase';
import { PurchaseAccessoryUseCase } from '../../../application/use-cases/PurchaseAccessoryUseCase';
import { EquipAccessoryUseCase } from '../../../application/use-cases/EquipAccessoryUseCase';
import { GetUserAccessoriesUseCase } from '../../../application/use-cases/GetUserAccessoriesUseCase';

// Achievement Use Cases
import { CreateAchievementUseCase } from '../../../application/use-cases/CreateAchievementUseCase';
import { GetAllAchievementsUseCase } from '../../../application/use-cases/GetAllAchievementsUseCase';
import { UnlockAchievementUseCase } from '../../../application/use-cases/UnlockAchievementUseCase';
import { GetUserAchievementsUseCase } from '../../../application/use-cases/GetUserAchievementsUseCase';

// Encouragement Note Use Cases
import { CreateEncouragementNoteUseCase } from '../../../application/use-cases/CreateEncouragementNoteUseCase';
import { GetAvatarEncouragementNotesUseCase } from '../../../application/use-cases/GetAvatarEncouragementNotesUseCase';
import { GetAllEncouragementNotesUseCase } from '../../../application/use-cases/GetAllEncouragementNotesUseCase';

import { PostgreSQLAvatarRepository } from '../../repositories/PostgreSQL/AvatarRepository';
import { PostgreSQLAccessoryRepository } from '../../repositories/PostgreSQL/AccessoryRepository';
import { PostgreSQLAvatarAccessoryRepository } from '../../repositories/PostgreSQL/AvatarAccessoryRepository';
import { PostgreSQLAchievementRepository } from '../../repositories/PostgreSQL/AchievementRepository';
import { PostgreSQLAvatarAchievementRepository } from '../../repositories/PostgreSQL/AvatarAchievementRepository';
import { PostgreSQLEncouragementNoteRepository } from '../../repositories/PostgreSQL/EncouragementNoteRepository';
import { UUIDService } from '../../services/UUIDService';
import { AvatarEventService } from '../../events/AvatarEventService';

// Repositories
export const avatarRepository = new PostgreSQLAvatarRepository();
export const accessoryRepository = new PostgreSQLAccessoryRepository();
export const avatarAccessoryRepository = new PostgreSQLAvatarAccessoryRepository();
export const achievementRepository = new PostgreSQLAchievementRepository();
export const avatarAchievementRepository = new PostgreSQLAvatarAchievementRepository();
export const encouragementNoteRepository = new PostgreSQLEncouragementNoteRepository();

// Services
export const uuidService = new UUIDService();
export const avatarEventService = new AvatarEventService();

// Avatar Use Cases
export const createAvatarUseCase = new CreateAvatarUseCase(avatarRepository, uuidService, avatarEventService);
export const getAvatarUseCase = new GetAvatarUseCase(avatarRepository);
export const getAllAvatarsUseCase = new GetAllAvatarsUseCase(avatarRepository);
export const addExperienceUseCase = new AddExperienceUseCase(avatarRepository, avatarEventService);
export const addCoinsUseCase = new AddCoinsUseCase(avatarRepository, avatarEventService);
export const spendCoinsUseCase = new SpendCoinsUseCase(avatarRepository, avatarEventService);

// Accessory Use Cases
export const createAccessoryUseCase = new CreateAccessoryUseCase(accessoryRepository, uuidService);
export const getAllAccessoriesUseCase = new GetAllAccessoriesUseCase(accessoryRepository);
export const purchaseAccessoryUseCase = new PurchaseAccessoryUseCase(avatarAccessoryRepository, accessoryRepository, avatarRepository, uuidService);
export const equipAccessoryUseCase = new EquipAccessoryUseCase(avatarAccessoryRepository, accessoryRepository);
export const getUserAccessoriesUseCase = new GetUserAccessoriesUseCase(avatarAccessoryRepository, accessoryRepository);

// Achievement Use Cases
export const createAchievementUseCase = new CreateAchievementUseCase(achievementRepository, uuidService);
export const getAllAchievementsUseCase = new GetAllAchievementsUseCase(achievementRepository);
export const unlockAchievementUseCase = new UnlockAchievementUseCase(avatarAchievementRepository, achievementRepository, uuidService);
export const getUserAchievementsUseCase = new GetUserAchievementsUseCase(avatarAchievementRepository, achievementRepository);

// Encouragement Note Use Cases
export const createEncouragementNoteUseCase = new CreateEncouragementNoteUseCase(encouragementNoteRepository, avatarRepository, uuidService);
export const getAvatarEncouragementNotesUseCase = new GetAvatarEncouragementNotesUseCase(encouragementNoteRepository, avatarRepository);
export const getAllEncouragementNotesUseCase = new GetAllEncouragementNotesUseCase(encouragementNoteRepository);

// Avatar Controllers
export const createAvatarController = new CreateAvatarController(createAvatarUseCase);
export const getAvatarController = new GetAvatarController(getAvatarUseCase);
export const getAllAvatarsController = new GetAllAvatarsController(getAllAvatarsUseCase);
export const addExperienceController = new AddExperienceController(addExperienceUseCase);
export const addCoinsController = new AddCoinsController(addCoinsUseCase);
export const spendCoinsController = new SpendCoinsController(spendCoinsUseCase);

// Accessory Controllers
export const createAccessoryController = new CreateAccessoryController(createAccessoryUseCase);
export const getAllAccessoriesController = new GetAllAccessoriesController(getAllAccessoriesUseCase);
export const purchaseAccessoryController = new PurchaseAccessoryController(purchaseAccessoryUseCase);
export const equipAccessoryController = new EquipAccessoryController(equipAccessoryUseCase);
export const getUserAccessoriesController = new GetUserAccessoriesController(getUserAccessoriesUseCase);

// Achievement Controllers
export const createAchievementController = new CreateAchievementController(createAchievementUseCase);
export const getAllAchievementsController = new GetAllAchievementsController(getAllAchievementsUseCase);
export const unlockAchievementController = new UnlockAchievementController(unlockAchievementUseCase);
export const getUserAchievementsController = new GetUserAchievementsController(getUserAchievementsUseCase);

// Encouragement Note Controllers
export const createEncouragementNoteController = new CreateEncouragementNoteController(createEncouragementNoteUseCase);
export const getAvatarEncouragementNotesController = new GetAvatarEncouragementNotesController(getAvatarEncouragementNotesUseCase);
export const getAllEncouragementNotesController = new GetAllEncouragementNotesController(getAllEncouragementNotesUseCase); 