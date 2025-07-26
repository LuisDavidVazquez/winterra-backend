import { PostEntity } from '../entities/PostEntity';

export interface PostRepository {
  save(post: PostEntity): Promise<PostEntity>;
  findById(id: string): Promise<PostEntity | null>;
  findByUserId(userId: string): Promise<PostEntity[]>;
  findAll(): Promise<PostEntity[]>;
  update(post: PostEntity): Promise<PostEntity>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
  getRecentPosts(limit: number): Promise<PostEntity[]>;
  getPostsWithImages(): Promise<PostEntity[]>;
} 