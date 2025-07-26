import { ReactionRepository } from '../../domain/repositories/ReactionRepository';
import { PostRepository } from '../../domain/repositories/PostRepository';
import { GetPostReactionsResponseDTO } from '../dtos/ReactionDTO';

export class GetPostReactionsUseCase {
  constructor(
    private reactionRepository: ReactionRepository,
    private postRepository: PostRepository
  ) {}

  async execute(postId: string): Promise<GetPostReactionsResponseDTO> {
    try {
      // Verify post exists
      const post = await this.postRepository.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Get reactions for the post
      const reactions = await this.reactionRepository.findByPostId(postId);

      // Sort by reaction date (newest first)
      const sortedReactions = reactions.sort((a, b) => 
        b.getReactedAt().getTime() - a.getReactedAt().getTime()
      );

      const response: GetPostReactionsResponseDTO = {
        success: true,
        data: sortedReactions.map(reaction => ({
          id: reaction.getId(),
          userId: reaction.getUserId(),
          postId: reaction.getPostId(),
          reactedAt: reaction.getReactedAt().toISOString(),
          daysSinceReaction: reaction.getDaysSinceReaction(),
          isRecentReaction: reaction.isRecentReaction(),
          isToday: reaction.isToday()
        })),
        message: 'Post reactions retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve post reactions: ${error.message}`);
    }
  }
} 