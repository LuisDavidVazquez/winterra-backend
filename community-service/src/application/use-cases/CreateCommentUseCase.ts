import { CommentEntity } from '../../domain/entities/CommentEntity';
import { CommentRepository } from '../../domain/repositories/CommentRepository';
import { PostRepository } from '../../domain/repositories/PostRepository';
import { IUUIDService } from '../services/IUUIDService';
import { CreateCommentRequestDTO, CreateCommentResponseDTO } from '../dtos/CommentDTO';

export class CreateCommentUseCase {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(request: CreateCommentRequestDTO): Promise<CreateCommentResponseDTO> {
    try {
      // Validate input
      if (!request.userId || request.userId.trim().length === 0) {
        throw new Error('User ID is required');
      }

      if (!request.postId || request.postId.trim().length === 0) {
        throw new Error('Post ID is required');
      }

      if (!request.content || request.content.trim().length === 0) {
        throw new Error('Comment content is required');
      }

      if (request.content.trim().length > 500) {
        throw new Error('Comment content cannot exceed 500 characters');
      }

      // Verify post exists
      const post = await this.postRepository.findById(request.postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Generate UUID
      const id = this.uuidService.generate();

      // Create comment entity
      const comment = new CommentEntity(
        id,
        request.userId,
        request.postId,
        request.content.trim(),
        new Date()
      );

      // Save to repository
      const savedComment = await this.commentRepository.save(comment);

      // Return response
      const response: CreateCommentResponseDTO = {
        success: true,
        data: {
          id: savedComment.getId(),
          userId: savedComment.getUserId(),
          postId: savedComment.getPostId(),
          content: savedComment.getContent(),
          createdAt: savedComment.getCreatedAt().toISOString(),
          contentLength: savedComment.getContentLength(),
          isShortComment: savedComment.isShortComment(),
          isLongComment: savedComment.isLongComment(),
          contentPreview: savedComment.getContentPreview(),
          daysSinceCreated: savedComment.getDaysSinceCreated(),
          isRecent: savedComment.isRecent()
        },
        message: 'Comment created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create comment: ${error.message}`);
    }
  }
} 