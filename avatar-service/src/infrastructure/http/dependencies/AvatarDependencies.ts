import { CreateAvatarController } from '../controllers/CreateAvatarController';
import { GetAvatarController } from '../controllers/GetAvatarController';
import { GetAllAvatarsController } from '../controllers/GetAllAvatarsController';
import { AddExperienceController } from '../controllers/AddExperienceController';
import { AddCoinsController } from '../controllers/AddCoinsController';
import { SpendCoinsController } from '../controllers/SpendCoinsController';

import { CreateAvatarUseCase } from '../../../application/use-cases/CreateAvatarUseCase';
import { GetAvatarUseCase } from '../../../application/use-cases/GetAvatarUseCase';
import { GetAllAvatarsUseCase } from '../../../application/use-cases/GetAllAvatarsUseCase';
import { AddExperienceUseCase } from '../../../application/use-cases/AddExperienceUseCase';
import { AddCoinsUseCase } from '../../../application/use-cases/AddCoinsUseCase';
import { SpendCoinsUseCase } from '../../../application/use-cases/SpendCoinsUseCase';

import { PostgreSQLAvatarRepository } from '../../repositories/PostgreSQL/AvatarRepository';
import { UUIDService } from '../../services/UUIDService';
import { AvatarEventService } from '../../events/AvatarEventService';

// Repositories
export const avatarRepository = new PostgreSQLAvatarRepository();

// Services
export const uuidService = new UUIDService();
export const avatarEventService = new AvatarEventService();

// Use Cases
export const createAvatarUseCase = new CreateAvatarUseCase(avatarRepository, uuidService, avatarEventService);
export const getAvatarUseCase = new GetAvatarUseCase(avatarRepository);
export const getAllAvatarsUseCase = new GetAllAvatarsUseCase(avatarRepository);
export const addExperienceUseCase = new AddExperienceUseCase(avatarRepository, avatarEventService);
export const addCoinsUseCase = new AddCoinsUseCase(avatarRepository, avatarEventService);
export const spendCoinsUseCase = new SpendCoinsUseCase(avatarRepository, avatarEventService);

// Controllers
export const createAvatarController = new CreateAvatarController(createAvatarUseCase);
export const getAvatarController = new GetAvatarController(getAvatarUseCase);
export const getAllAvatarsController = new GetAllAvatarsController(getAllAvatarsUseCase);
export const addExperienceController = new AddExperienceController(addExperienceUseCase);
export const addCoinsController = new AddCoinsController(addCoinsUseCase);
export const spendCoinsController = new SpendCoinsController(spendCoinsUseCase); 