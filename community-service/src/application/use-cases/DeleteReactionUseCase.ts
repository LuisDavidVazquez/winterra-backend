import { ReactionRepository } from '../../domain/repositories/ReactionRepository';
import { DeleteReactionResponseDTO } from '../dtos/ReactionDTO';

export class DeleteReactionUseCase {
  constructor(private reactionRepository: ReactionRepository) {}

  async execute(userId: string, postId: string): Promise<DeleteReactionResponseDTO> {
    try {
      // Check if reaction exists
      const existingReaction = await this.reactionRepository.findByUserAndPost(userId, postId);
      if (!existingReaction) {
        throw new Error('Reaction not found');
      }

      // Delete the reaction
      await this.reactionRepository.deleteByUserAndPost(userId, postId);

      const response: DeleteReactionResponseDTO = {
        success: true,
        data: null,
        message: 'Reaction deleted successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to delete reaction: ${error.message}`);
    }
  }
} 