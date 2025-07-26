import { EncouragementNoteRepository } from '../../domain/repositories/EncouragementNoteRepository';
import { AvatarRepository } from '../../domain/repositories/AvatarRepository';
import { GetAvatarEncouragementNotesResponseDTO } from '../dtos/EncouragementNoteDTO';

export class GetAvatarEncouragementNotesUseCase {
  constructor(
    private encouragementNoteRepository: EncouragementNoteRepository,
    private avatarRepository: AvatarRepository
  ) {}

  async execute(avatarId: string): Promise<GetAvatarEncouragementNotesResponseDTO> {
    try {
      // Verify avatar exists
      const avatar = await this.avatarRepository.findById(avatarId);
      if (!avatar) {
        throw new Error('Avatar not found');
      }

      // Get encouragement notes for the avatar
      const notes = await this.encouragementNoteRepository.findByAvatarId(avatarId);

      // Sort by creation date (newest first)
      const sortedNotes = notes.sort((a, b) => 
        b.getCreatedAt().getTime() - a.getCreatedAt().getTime()
      );

      const response: GetAvatarEncouragementNotesResponseDTO = {
        success: true,
        data: sortedNotes.map(note => ({
          id: note.getId(),
          avatarId: note.getAvatarId(),
          content: note.getContent(),
          createdAt: note.getCreatedAt().toISOString(),
          contentLength: note.getContentLength(),
          isShortNote: note.isShortNote(),
          isLongNote: note.isLongNote(),
          contentPreview: note.getContentPreview()
        })),
        message: 'Avatar encouragement notes retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve avatar encouragement notes: ${error.message}`);
    }
  }
} 