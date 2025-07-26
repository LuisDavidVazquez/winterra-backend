import { ReactionEntity } from '../entities/ReactionEntity';

export interface ReactionRepository {
  save(reaction: ReactionEntity): Promise<ReactionEntity>;
  findById(id: string): Promise<ReactionEntity | null>;
  findByPostId(postId: string): Promise<ReactionEntity[]>;
  findByUserId(userId: string): Promise<ReactionEntity[]>;
  findByUserAndPost(userId: string, postId: string): Promise<ReactionEntity | null>;
  findAll(): Promise<ReactionEntity[]>;
  delete(id: string): Promise<void>;
  deleteByUserAndPost(userId: string, postId: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
  existsByUserAndPost(userId: string, postId: string): Promise<boolean>;
  getReactionCountByPost(postId: string): Promise<number>;
  getRecentReactions(limit: number): Promise<ReactionEntity[]>;
} 