import { EncouragementNoteRepository } from '../../domain/repositories/EncouragementNoteRepository';
import { GetAllEncouragementNotesResponseDTO } from '../dtos/EncouragementNoteDTO';

export class GetAllEncouragementNotesUseCase {
  constructor(private encouragementNoteRepository: EncouragementNoteRepository) {}

  async execute(): Promise<GetAllEncouragementNotesResponseDTO> {
    try {
      const notes = await this.encouragementNoteRepository.findAll();

      // Sort by creation date (newest first)
      const sortedNotes = notes.sort((a, b) => 
        b.getCreatedAt().getTime() - a.getCreatedAt().getTime()
      );

      const response: GetAllEncouragementNotesResponseDTO = {
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
        message: 'All encouragement notes retrieved successfully'
      };

      return response;
    } catch (error: any) {
      throw new Error(`Failed to retrieve all encouragement notes: ${error.message}`);
    }
  }
} 