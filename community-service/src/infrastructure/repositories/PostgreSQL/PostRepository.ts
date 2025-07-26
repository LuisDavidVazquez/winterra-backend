import { Repository } from 'typeorm';
import { PostEntity } from '../../../domain/entities/PostEntity';
import { PostRepository as IPostRepository } from '../../../domain/repositories/PostRepository';
import { PostModel } from '../../models/PostModel';
import { AppDataSource } from '../../../../config/db/database';

export class PostgreSQLPostRepository implements IPostRepository {
  private get repository(): Repository<PostModel> {
    return AppDataSource.getRepository(PostModel);
  }

  async save(post: PostEntity): Promise<PostEntity> {
    const model = new PostModel();
    model.id = post.getId();
    model.userId = post.getUserId();
    model.content = post.getContent();
    model.imageUrl = post.getImageUrl();
    model.createdAt = post.getCreatedAt();

    const savedModel = await this.repository.save(model);

    return new PostEntity(
      savedModel.id,
      savedModel.userId,
      savedModel.content,
      savedModel.imageUrl,
      savedModel.createdAt
    );
  }

  async findById(id: string): Promise<PostEntity | null> {
    const model = await this.repository.findOne({ where: { id } });
    
    if (!model) {
      return null;
    }

    return new PostEntity(
      model.id,
      model.userId,
      model.content,
      model.imageUrl,
      model.createdAt
    );
  }

  async findByUserId(userId: string): Promise<PostEntity[]> {
    const models = await this.repository.find({ 
      where: { userId },
      order: { createdAt: 'DESC' }
    });
    
    return models.map(model => new PostEntity(
      model.id,
      model.userId,
      model.content,
      model.imageUrl,
      model.createdAt
    ));
  }

  async findAll(): Promise<PostEntity[]> {
    const models = await this.repository.find({
      order: { createdAt: 'DESC' }
    });
    
    return models.map(model => new PostEntity(
      model.id,
      model.userId,
      model.content,
      model.imageUrl,
      model.createdAt
    ));
  }

  async update(post: PostEntity): Promise<PostEntity> {
    const model = await this.repository.findOne({ where: { id: post.getId() } });
    
    if (!model) {
      throw new Error('Post not found');
    }

    model.userId = post.getUserId();
    model.content = post.getContent();
    model.imageUrl = post.getImageUrl();

    const updatedModel = await this.repository.save(model);

    return new PostEntity(
      updatedModel.id,
      updatedModel.userId,
      updatedModel.content,
      updatedModel.imageUrl,
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

  async getRecentPosts(limit: number): Promise<PostEntity[]> {
    const models = await this.repository.find({
      order: { createdAt: 'DESC' },
      take: limit
    });
    
    return models.map(model => new PostEntity(
      model.id,
      model.userId,
      model.content,
      model.imageUrl,
      model.createdAt
    ));
  }

  async getPostsWithImages(): Promise<PostEntity[]> {
    const models = await this.repository
      .createQueryBuilder('post')
      .where('post.imageUrl IS NOT NULL')
      .andWhere('post.imageUrl != :empty', { empty: '' })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
    
    return models.map(model => new PostEntity(
      model.id,
      model.userId,
      model.content,
      model.imageUrl,
      model.createdAt
    ));
  }
} 