import { EncouragementNoteEntity } from '../../domain/entities/EncouragementNoteEntity';
import { EncouragementNoteRepository } from '../../domain/repositories/EncouragementNoteRepository';
import { AvatarRepository } from '../../domain/repositories/AvatarRepository';
import { IUUIDService } from '../services/IUUIDService';
import { CreateEncouragementNoteRequestDTO, CreateEncouragementNoteResponseDTO } from '../dtos/EncouragementNoteDTO';

export class CreateEncouragementNoteUseCase {
  constructor(
    private encouragementNoteRepository: EncouragementNoteRepository,
    private avatarRepository: AvatarRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(request: CreateEncouragementNoteRequestDTO): Promise<CreateEncouragementNoteResponseDTO> {
    try {
      // Validate input
      if (!request.avatarId || request.avatarId.trim().length === 0) {
        throw new Error('Avatar ID is required');
      }

      if (!request.content || request.content.trim().length === 0) {
        throw new Error('Note content is required');
      }

      if (request.content.trim().length > 1000) {
        throw new Error('Note content cannot exceed 1000 characters');
      }

      // Verify avatar exists
      const avatar = await this.avatarRepository.findById(request.avatarId);
      if (!avatar) {
        throw new Error('Avatar not found');
      }

      // Generate UUID
      const id = this.uuidService.generate();

      // Create encouragement note entity
      const encouragementNote = new EncouragementNoteEntity(
        id,
        request.avatarId,
        request.content.trim(),
        new Date()
      );

      // Save to repository
      const savedNote = await this.encouragementNoteRepository.save(encouragementNote);

      // Return response
      const response: CreateEncouragementNoteResponseDTO = {
        success: true,
        data: {
          id: savedNote.getId(),
          avatarId: savedNote.getAvatarId(),
          content: savedNote.getContent(),
          createdAt: savedNote.getCreatedAt().toISOString(),
          contentLength: savedNote.getContentLength(),
          isShortNote: savedNote.isShortNote(),
          isLongNote: savedNote.isLongNote(),
          contentPreview: savedNote.getContentPreview()
        },
        message: 'Encouragement note created successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to create encouragement note: ${error.message}`);
    }
  }
} 