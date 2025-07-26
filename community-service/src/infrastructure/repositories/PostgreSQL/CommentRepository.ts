import { Repository } from 'typeorm';
import { CommentEntity } from '../../../domain/entities/CommentEntity';
import { CommentRepository as ICommentRepository } from '../../../domain/repositories/CommentRepository';
import { CommentModel } from '../../models/CommentModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLCommentRepository implements ICommentRepository {
  private get repository(): Repository<CommentModel> {
    return AppDataSource.getRepository(CommentModel);
  }

  async save(comment: CommentEntity): Promise<CommentEntity> {
    const model = new CommentModel();
    model.id = comment.getId();
    model.userId = comment.getUserId();
    model.postId = comment.getPostId();
    model.content = comment.getContent();
    model.createdAt = comment.getCreatedAt();

    const savedModel = await this.repository.save(model);

    return new CommentEntity(
      savedModel.id,
      savedModel.userId,
      savedModel.postId,
      savedModel.content,
      savedModel.createdAt
    );
  }

  async findById(id: string): Promise<CommentEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new CommentEntity(
      model.id,
      model.userId,
      model.postId,
      model.content,
      model.createdAt
    );
  }

  async findByPostId(postId: string): Promise<CommentEntity[]> {
    const models = await this.repository.find({ 
      where: { postId },
      order: { createdAt: 'DESC' }
    });
    
    return models.map(model => new CommentEntity(
      model.id,
      model.userId,
      model.postId,
      model.content,
      model.createdAt
    ));
  }

  async findByUserId(userId: string): Promise<CommentEntity[]> {
    const models = await this.repository.find({ 
      where: { userId },
      order: { createdAt: 'DESC' }
    });
    
    return models.map(model => new CommentEntity(
      model.id,
      model.userId,
      model.postId,
      model.content,
      model.createdAt
    ));
  }

  async findAll(): Promise<CommentEntity[]> {
    const models = await this.repository.find({
      order: { createdAt: 'DESC' }
    });
    
    return models.map(model => new CommentEntity(
      model.id,
      model.userId,
      model.postId,
      model.content,
      model.createdAt
    ));
  }

  async update(comment: CommentEntity): Promise<CommentEntity> {
    const model = await this.repository.findOne({ where: { id: comment.getId() } });
    
    if (!model) {
      throw new Error('Comment not found');
    }

    model.userId = comment.getUserId();
    model.postId = comment.getPostId();
    model.content = comment.getContent();

    const updatedModel = await this.repository.save(model);

    return new CommentEntity(
      updatedModel.id,
      updatedModel.userId,
      updatedModel.postId,
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

  async getRecentComments(limit: number): Promise<CommentEntity[]> {
    const models = await this.repository.find({
      order: { createdAt: 'DESC' },
      take: limit
    });
    
    return models.map(model => new CommentEntity(
      model.id,
      model.userId,
      model.postId,
      model.content,
      model.createdAt
    ));
  }

  async getCommentsByPost(postId: string, limit?: number): Promise<CommentEntity[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId })
      .orderBy('comment.createdAt', 'DESC');

    if (limit) {
      queryBuilder.take(limit);
    }

    const models = await queryBuilder.getMany();
    
    return models.map(model => new CommentEntity(
      model.id,
      model.userId,
      model.postId,
      model.content,
      model.createdAt
    ));
  }
} 