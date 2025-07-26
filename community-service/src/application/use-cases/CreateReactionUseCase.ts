import { ReactionEntity } from '../../domain/entities/ReactionEntity';
import { ReactionRepository } from '../../domain/repositories/ReactionRepository';
import { PostRepository } from '../../domain/repositories/PostRepository';
import { IUUIDService } from '../services/IUUIDService';
import { CreateReactionRequestDTO, CreateReactionResponseDTO } from '../dtos/ReactionDTO';

export class CreateReactionUseCase {
  constructor(
    private reactionRepository: ReactionRepository,
    private postRepository: PostRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(request: CreateReactionRequestDTO): Promise<CreateReactionResponseDTO> {
    try {
      // Validate input
      if (!request.userId || request.userId.trim().length === 0) {
        throw new Error('User ID is required');
      }

      if (!request.postId || request.postId.trim().length === 0) {
        throw new Error('Post ID is required');
      }

      // Verify post exists
      const post = await this.postRepository.findById(request.postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Check if user already reacted to this post
      const existingReaction = await this.reactionRepository.findByUserAndPost(request.userId, request.postId);
      if (existingReaction) {
        throw new Error('User has already reacted to this post');
      }

      // Generate UUID
      const id = this.uuidService.generate();

      // Create reaction entity
      const reaction = new ReactionEntity(
        id,
        request.userId,
        request.postId,
        new Date()
      );

      // Save to repository
      const savedReaction = await this.reactionRepository.save(reaction);

      // Return response
      const response: CreateReactionResponseDTO = {
        success: true,
        data: {
          id: savedReaction.getId(),
          userId: savedReaction.getUserId(),
          postId: savedReaction.getPostId(),
          reactedAt: savedReaction.getReactedAt().toISOString(),
          daysSinceReaction: savedReaction.getDaysSinceReaction(),
          isRecentReaction: savedReaction.isRecentReaction(),
          isToday: savedReaction.isToday()
        },
        message: 'Reaction created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create reaction: ${error.message}`);
    }
  }
} 