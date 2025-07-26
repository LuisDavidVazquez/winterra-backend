import { EncouragementNoteEntity } from '../entities/EncouragementNoteEntity';

export interface EncouragementNoteRepository {
  save(encouragementNote: EncouragementNoteEntity): Promise<EncouragementNoteEntity>;
  findById(id: string): Promise<EncouragementNoteEntity | null>;
  findByAvatarId(avatarId: string): Promise<EncouragementNoteEntity[]>;
  findAll(): Promise<EncouragementNoteEntity[]>;
  update(encouragementNote: EncouragementNoteEntity): Promise<EncouragementNoteEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
  getRecentNotes(avatarId: string, limit: number): Promise<EncouragementNoteEntity[]>;
} 