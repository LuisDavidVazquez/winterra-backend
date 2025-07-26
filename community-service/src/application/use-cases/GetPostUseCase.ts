import { PostRepository } from '../../domain/repositories/PostRepository';
import { GetPostResponseDTO } from '../dtos/PostDTO';

export class GetPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(postId: string): Promise<GetPostResponseDTO> {
    try {
      const post = await this.postRepository.findById(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      const response: GetPostResponseDTO = {
        success: true,
        data: {
          id: post.getId(),
          userId: post.getUserId(),
          content: post.getContent(),
          imageUrl: post.getImageUrl(),
          createdAt: post.getCreatedAt().toISOString(),
          contentLength: post.getContentLength(),
          isShortPost: post.isShortPost(),
          isLongPost: post.isLongPost(),
          contentPreview: post.getContentPreview(),
          hasImage: post.hasImage(),
          daysSinceCreated: post.getDaysSinceCreated(),
          isRecent: post.isRecent()
        },
        message: 'Post retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve post: ${error.message}`);
    }
  }
} 