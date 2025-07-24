import { Friendship } from '../entities/Friendship';
import { UUID } from '../value-objects/UUID';

export interface IFriendshipRepository {
  save(friendship: Friendship): Promise<Friendship>;
  findById(id: UUID): Promise<Friendship | null>;
  findByUserAndFriend(userId: UUID, friendId: UUID): Promise<Friendship | null>;
  findByUserId(userId: UUID): Promise<Friendship[]>;
  findByStatus(userId: UUID, status: string): Promise<Friendship[]>;
  findBestFriends(userId: UUID): Promise<Friendship[]>;
  delete(id: UUID): Promise<void>;
  exists(userId: UUID, friendId: UUID): Promise<boolean>;
} 