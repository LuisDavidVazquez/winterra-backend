import { PostEntity } from '../../domain/entities/PostEntity';
import { PostRepository } from '../../domain/repositories/PostRepository';
import { IUUIDService } from '../services/IUUIDService';
import { CreatePostRequestDTO, CreatePostResponseDTO } from '../dtos/PostDTO';

export class CreatePostUseCase {
  constructor(
    private postRepository: PostRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(request: CreatePostRequestDTO): Promise<CreatePostResponseDTO> {
    try {
      // Validate input
      if (!request.userId || request.userId.trim().length === 0) {
        throw new Error('User ID is required');
      }

      if (!request.content || request.content.trim().length === 0) {
        throw new Error('Post content is required');
      }

      if (request.content.trim().length > 1000) {
        throw new Error('Post content cannot exceed 1000 characters');
      }

      // Generate UUID
      const id = this.uuidService.generate();

      // Create post entity
      const post = new PostEntity(
        id,
        request.userId,
        request.content.trim(),
        request.imageUrl || null,
        new Date()
      );

      // Save to repository
      const savedPost = await this.postRepository.save(post);

      // Return response
      const response: CreatePostResponseDTO = {
        success: true,
        data: {
          id: savedPost.getId(),
          userId: savedPost.getUserId(),
          content: savedPost.getContent(),
          imageUrl: savedPost.getImageUrl(),
          createdAt: savedPost.getCreatedAt().toISOString(),
          contentLength: savedPost.getContentLength(),
          isShortPost: savedPost.isShortPost(),
          isLongPost: savedPost.isLongPost(),
          contentPreview: savedPost.getContentPreview(),
          hasImage: savedPost.hasImage(),
          daysSinceCreated: savedPost.getDaysSinceCreated(),
          isRecent: savedPost.isRecent()
        },
        message: 'Post created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }
} 