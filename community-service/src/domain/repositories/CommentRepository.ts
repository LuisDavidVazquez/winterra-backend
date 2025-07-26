import { CommentEntity } from '../entities/CommentEntity';

export interface CommentRepository {
  save(comment: CommentEntity): Promise<CommentEntity>;
  findById(id: string): Promise<CommentEntity | null>;
  findByPostId(postId: string): Promise<CommentEntity[]>;
  findByUserId(userId: string): Promise<CommentEntity[]>;
  findAll(): Promise<CommentEntity[]>;
  update(comment: CommentEntity): Promise<CommentEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
  getRecentComments(limit: number): Promise<CommentEntity[]>;
  getCommentsByPost(postId: string, limit?: number): Promise<CommentEntity[]>;
} 