import { CommentRepository } from '../../domain/repositories/CommentRepository';
import { PostRepository } from '../../domain/repositories/PostRepository';
import { GetPostCommentsResponseDTO } from '../dtos/CommentDTO';

export class GetPostCommentsUseCase {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository
  ) {}

  async execute(postId: string): Promise<GetPostCommentsResponseDTO> {
    try {
      // Verify post exists
      const post = await this.postRepository.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Get comments for the post
      const comments = await this.commentRepository.findByPostId(postId);

      // Sort by creation date (newest first)
      const sortedComments = comments.sort((a, b) => 
        b.getCreatedAt().getTime() - a.getCreatedAt().getTime()
      );

      const response: GetPostCommentsResponseDTO = {
        success: true,
        data: sortedComments.map(comment => ({
          id: comment.getId(),
          userId: comment.getUserId(),
          postId: comment.getPostId(),
          content: comment.getContent(),
          createdAt: comment.getCreatedAt().toISOString(),
          contentLength: comment.getContentLength(),
          isShortComment: comment.isShortComment(),
          isLongComment: comment.isLongComment(),
          contentPreview: comment.getContentPreview(),
          daysSinceCreated: comment.getDaysSinceCreated(),
          isRecent: comment.isRecent()
        })),
        message: 'Post comments retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve post comments: ${error.message}`);
    }
  }
} 