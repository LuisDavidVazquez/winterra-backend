import { UserEntity } from '../entities/UserEntity';
import { Email } from '../value-objects/Email';

export interface UserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: Email): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  existsByEmail(email: Email): Promise<boolean>;
}
