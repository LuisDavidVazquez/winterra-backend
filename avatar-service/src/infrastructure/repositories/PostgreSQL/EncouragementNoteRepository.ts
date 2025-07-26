import { Repository } from 'typeorm';
import { EncouragementNoteEntity } from '../../../domain/entities/EncouragementNoteEntity';
import { EncouragementNoteRepository as IEncouragementNoteRepository } from '../../../domain/repositories/EncouragementNoteRepository';
import { EncouragementNoteModel } from '../../models/EncouragementNoteModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLEncouragementNoteRepository implements IEncouragementNoteRepository {
  private get repository(): Repository<EncouragementNoteModel> {
    return AppDataSource.getRepository(EncouragementNoteModel);
  }

  async save(encouragementNote: EncouragementNoteEntity): Promise<EncouragementNoteEntity> {
    const model = new EncouragementNoteModel();
    model.id = encouragementNote.getId();
    model.avatarId = encouragementNote.getAvatarId();
    model.content = encouragementNote.getContent();
    model.createdAt = encouragementNote.getCreatedAt();

    const savedModel = await this.repository.save(model);

    return new EncouragementNoteEntity(
      savedModel.id,
      savedModel.avatarId,
      savedModel.content,
      savedModel.createdAt
    );
  }

  async findById(id: string): Promise<EncouragementNoteEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new EncouragementNoteEntity(
      model.id,
      model.avatarId,
      model.content,
      model.createdAt
    );
  }

  async findByAvatarId(avatarId: string): Promise<EncouragementNoteEntity[]> {
    const models = await this.repository.find({ 
      where: { avatarId },
      order: { createdAt: 'DESC' }
    });
    
    return models.map(model => new EncouragementNoteEntity(
      model.id,
      model.avatarId,
      model.content,
      model.createdAt
    ));
  }

  async findAll(): Promise<EncouragementNoteEntity[]> {
    const models = await this.repository.find({
      order: { createdAt: 'DESC' }
    });
    
    return models.map(model => new EncouragementNoteEntity(
      model.id,
      model.avatarId,
      model.content,
      model.createdAt
    ));
  }

  async update(encouragementNote: EncouragementNoteEntity): Promise<EncouragementNoteEntity> {
    const model = await this.repository.findOne({ where: { id: encouragementNote.getId() } });
    
    if (!model) {
      throw new Error('Encouragement note not found');
    }

    model.avatarId = encouragementNote.getAvatarId();
    model.content = encouragementNote.getContent();

    const updatedModel = await this.repository.save(model);

    return new EncouragementNoteEntity(
      updatedModel.id,
      updatedModel.avatarId,
      updatedModel.content,
      updatedModel.createdAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }

  async getRecentNotes(avatarId: string, limit: number): Promise<EncouragementNoteEntity[]> {
    const models = await this.repository.find({
      where: { avatarId },
      order: { createdAt: 'DESC' },
      take: limit
    });
    
    return models.map(model => new EncouragementNoteEntity(
      model.id,
      model.avatarId,
      model.content,
      model.createdAt
    ));
  }
} 