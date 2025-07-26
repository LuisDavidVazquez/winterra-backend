import { Repository } from 'typeorm';
import { ReactionEntity } from '../../../domain/entities/ReactionEntity';
import { ReactionRepository as IReactionRepository } from '../../../domain/repositories/ReactionRepository';
import { ReactionModel } from '../../models/ReactionModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLReactionRepository implements IReactionRepository {
  private get repository(): Repository<ReactionModel> {
    return AppDataSource.getRepository(ReactionModel);
  }

  async save(reaction: ReactionEntity): Promise<ReactionEntity> {
    const model = new ReactionModel();
    model.id = reaction.getId();
    model.userId = reaction.getUserId();
    model.postId = reaction.getPostId();
    model.reactedAt = reaction.getReactedAt();

    const savedModel = await this.repository.save(model);

    return new ReactionEntity(
      savedModel.id,
      savedModel.userId,
      savedModel.postId,
      savedModel.reactedAt
    );
  }

  async findById(id: string): Promise<ReactionEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new ReactionEntity(
      model.id,
      model.userId,
      model.postId,
      model.reactedAt
    );
  }

  async findByPostId(postId: string): Promise<ReactionEntity[]> {
    const models = await this.repository.find({ 
      where: { postId },
      order: { reactedAt: 'DESC' }
    });
    
    return models.map(model => new ReactionEntity(
      model.id,
      model.userId,
      model.postId,
      model.reactedAt
    ));
  }

  async findByUserId(userId: string): Promise<ReactionEntity[]> {
    const models = await this.repository.find({ 
      where: { userId },
      order: { reactedAt: 'DESC' }
    });
    
    return models.map(model => new ReactionEntity(
      model.id,
      model.userId,
      model.postId,
      model.reactedAt
    ));
  }

  async findByUserAndPost(userId: string, postId: string): Promise<ReactionEntity | null> {
    const model = await this.repository.findOne({ 
      where: { userId, postId }
    });
    
    if (!model) {
      return null;
    }

    return new ReactionEntity(
      model.id,
      model.userId,
      model.postId,
      model.reactedAt
    );
  }

  async findAll(): Promise<ReactionEntity[]> {
    const models = await this.repository.find({
      order: { reactedAt: 'DESC' }
    });
    
    return models.map(model => new ReactionEntity(
      model.id,
      model.userId,
      model.postId,
      model.reactedAt
    ));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByUserAndPost(userId: string, postId: string): Promise<void> {
    await this.repository.delete({ userId, postId });
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }

  async existsByUserAndPost(userId: string, postId: string): Promise<boolean> {
    const count = await this.repository.count({ where: { userId, postId } });
    return count > 0;
  }

  async getReactionCountByPost(postId: string): Promise<number> {
    return await this.repository.count({ where: { postId } });
  }

  async getRecentReactions(limit: number): Promise<ReactionEntity[]> {
    const models = await this.repository.find({
      order: { reactedAt: 'DESC' },
      take: limit
    });
    
    return models.map(model => new ReactionEntity(
      model.id,
      model.userId,
      model.postId,
      model.reactedAt
    ));
  }
} 