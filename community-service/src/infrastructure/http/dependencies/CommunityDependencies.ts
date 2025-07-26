// Post Controllers
import { CreatePostController } from '../controllers/CreatePostController';
import { GetAllPostsController } from '../controllers/GetAllPostsController';
import { GetPostController } from '../controllers/GetPostController';

// Comment Controllers
import { CreateCommentController } from '../controllers/CreateCommentController';
import { GetPostCommentsController } from '../controllers/GetPostCommentsController';

// Reaction Controllers
import { CreateReactionController } from '../controllers/CreateReactionController';
import { DeleteReactionController } from '../controllers/DeleteReactionController';
import { GetPostReactionsController } from '../controllers/GetPostReactionsController';

// Post Use Cases
import { CreatePostUseCase } from '../../../application/use-cases/CreatePostUseCase';
import { GetAllPostsUseCase } from '../../../application/use-cases/GetAllPostsUseCase';
import { GetPostUseCase } from '../../../application/use-cases/GetPostUseCase';

// Comment Use Cases
import { CreateCommentUseCase } from '../../../application/use-cases/CreateCommentUseCase';
import { GetPostCommentsUseCase } from '../../../application/use-cases/GetPostCommentsUseCase';

// Reaction Use Cases
import { CreateReactionUseCase } from '../../../application/use-cases/CreateReactionUseCase';
import { DeleteReactionUseCase } from '../../../application/use-cases/DeleteReactionUseCase';
import { GetPostReactionsUseCase } from '../../../application/use-cases/GetPostReactionsUseCase';

// Repositories
import { PostgreSQLPostRepository } from '../../repositories/PostgreSQL/PostRepository';
import { PostgreSQLCommentRepository } from '../../repositories/PostgreSQL/CommentRepository';
import { PostgreSQLReactionRepository } from '../../repositories/PostgreSQL/ReactionRepository';
import { UUIDService } from '../../services/UUIDService';

// Repositories
export const postRepository = new PostgreSQLPostRepository();
export const commentRepository = new PostgreSQLCommentRepository();
export const reactionRepository = new PostgreSQLReactionRepository();

// Services
export const uuidService = new UUIDService();

// Post Use Cases
export const createPostUseCase = new CreatePostUseCase(postRepository, uuidService);
export const getAllPostsUseCase = new GetAllPostsUseCase(postRepository);
export const getPostUseCase = new GetPostUseCase(postRepository);

// Comment Use Cases
export const createCommentUseCase = new CreateCommentUseCase(commentRepository, postRepository, uuidService);
export const getPostCommentsUseCase = new GetPostCommentsUseCase(commentRepository, postRepository);

// Reaction Use Cases
export const createReactionUseCase = new CreateReactionUseCase(reactionRepository, postRepository, uuidService);
export const deleteReactionUseCase = new DeleteReactionUseCase(reactionRepository);
export const getPostReactionsUseCase = new GetPostReactionsUseCase(reactionRepository, postRepository);

// Post Controllers
export const createPostController = new CreatePostController(createPostUseCase);
export const getAllPostsController = new GetAllPostsController(getAllPostsUseCase);
export const getPostController = new GetPostController(getPostUseCase);

// Comment Controllers
export const createCommentController = new CreateCommentController(createCommentUseCase);
export const getPostCommentsController = new GetPostCommentsController(getPostCommentsUseCase);

// Reaction Controllers
export const createReactionController = new CreateReactionController(createReactionUseCase);
export const deleteReactionController = new DeleteReactionController(deleteReactionUseCase);
export const getPostReactionsController = new GetPostReactionsController(getPostReactionsUseCase); 