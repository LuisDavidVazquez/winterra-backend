import { PostRepository } from '../../domain/repositories/PostRepository';
import { GetAllPostsResponseDTO } from '../dtos/PostDTO';

export class GetAllPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<GetAllPostsResponseDTO> {
    try {
      const posts = await this.postRepository.findAll();

      // Sort by creation date (newest first)
      const sortedPosts = posts.sort((a, b) => 
        b.getCreatedAt().getTime() - a.getCreatedAt().getTime()
      );

      const response: GetAllPostsResponseDTO = {
        success: true,
        data: sortedPosts.map(post => ({
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
        })),
        message: 'All posts retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve all posts: ${error.message}`);
    }
  }
} 