import { AppDataSource } from '../../../../config/db/database';
import { PostgreSQLFriendshipRepository } from '../../repositories/PostgreSQLFriendship';
import { PostgreSQLUserRepository } from '../../repositories/PostgreSQL';
import { UUIDService } from '../../services/UUIDService';

// Use Cases
import { CreateFriendshipUseCase } from '../../../application/use-cases/CreateFriendshipUseCase';
import { AcceptFriendshipUseCase } from '../../../application/use-cases/AcceptFriendshipUseCase';
import { RejectFriendshipUseCase } from '../../../application/use-cases/RejectFriendshipUseCase';
import { SetBestFriendUseCase } from '../../../application/use-cases/SetBestFriendUseCase';
import { RemoveBestFriendUseCase } from '../../../application/use-cases/RemoveBestFriendUseCase';
import { DeleteFriendshipUseCase } from '../../../application/use-cases/DeleteFriendshipUseCase';
import { GetFriendshipsUseCase } from '../../../application/use-cases/GetFriendshipsUseCase';
import { GetBestFriendsUseCase } from '../../../application/use-cases/GetBestFriendsUseCase';
import { GetPendingFriendRequestsUseCase } from '../../../application/use-cases/GetPendingFriendRequestsUseCase';

// Controllers
import { CreateFriendshipController } from '../controllers/CreateFriendshipController';
import { AcceptFriendshipController } from '../controllers/AcceptFriendshipController';
import { RejectFriendshipController } from '../controllers/RejectFriendshipController';
import { SetBestFriendController } from '../controllers/SetBestFriendController';
import { RemoveBestFriendController } from '../controllers/RemoveBestFriendController';
import { DeleteFriendshipController } from '../controllers/DeleteFriendshipController';
import { GetFriendshipsController } from '../controllers/GetFriendshipsController';
import { GetBestFriendsController } from '../controllers/GetBestFriendsController';
import { GetPendingFriendRequestsController } from '../controllers/GetPendingFriendRequestsController';

// Services
export const uuidService = new UUIDService();

// Repositories
export const friendshipRepository = new PostgreSQLFriendshipRepository(AppDataSource);
export const userRepository = new PostgreSQLUserRepository();

// Use Cases
export const createFriendshipUseCase = new CreateFriendshipUseCase(friendshipRepository, uuidService);
export const acceptFriendshipUseCase = new AcceptFriendshipUseCase(friendshipRepository);
export const rejectFriendshipUseCase = new RejectFriendshipUseCase(friendshipRepository);
export const setBestFriendUseCase = new SetBestFriendUseCase(friendshipRepository);
export const removeBestFriendUseCase = new RemoveBestFriendUseCase(friendshipRepository);
export const deleteFriendshipUseCase = new DeleteFriendshipUseCase(friendshipRepository);
export const getFriendshipsUseCase = new GetFriendshipsUseCase(friendshipRepository);
export const getBestFriendsUseCase = new GetBestFriendsUseCase(friendshipRepository);
export const getPendingFriendRequestsUseCase = new GetPendingFriendRequestsUseCase(friendshipRepository, userRepository);

// Controllers
export const createFriendshipController = new CreateFriendshipController(createFriendshipUseCase);
export const acceptFriendshipController = new AcceptFriendshipController(acceptFriendshipUseCase);
export const rejectFriendshipController = new RejectFriendshipController(rejectFriendshipUseCase);
export const setBestFriendController = new SetBestFriendController(setBestFriendUseCase);
export const removeBestFriendController = new RemoveBestFriendController(removeBestFriendUseCase);
export const deleteFriendshipController = new DeleteFriendshipController(deleteFriendshipUseCase);
export const getFriendshipsController = new GetFriendshipsController(getFriendshipsUseCase);
export const getBestFriendsController = new GetBestFriendsController(getBestFriendsUseCase);
export const getPendingFriendRequestsController = new GetPendingFriendRequestsController(getPendingFriendRequestsUseCase); 