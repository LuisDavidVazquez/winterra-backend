import { DataSource } from 'typeorm';
import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { Friendship } from '../../domain/entities/Friendship';
import { UUID } from '../../domain/value-objects/UUID';
import { FriendshipStatus } from '../../domain/value-objects/FriendshipStatus';
import { FriendshipModel } from '../models/FriendshipModel';

export class PostgreSQLFriendshipRepository implements IFriendshipRepository {
  constructor(private dataSource: DataSource) {}

  async save(friendship: Friendship): Promise<Friendship> {
    const friendshipModel = this.dataSource.getRepository(FriendshipModel);
    
    const existingFriendship = await friendshipModel.findOne({
      where: [
        { user_id: friendship.userId.value, friend_id: friendship.friendId.value },
        { user_id: friendship.friendId.value, friend_id: friendship.userId.value }
      ]
    });

    if (existingFriendship) {
      // Update existing friendship
      existingFriendship.status = friendship.status.value;
      existingFriendship.is_best_friend = friendship.isBestFriend;
      await friendshipModel.save(existingFriendship);
      
      return new Friendship(
        new UUID(existingFriendship.id),
        new UUID(existingFriendship.user_id),
        new UUID(existingFriendship.friend_id),
        new FriendshipStatus(existingFriendship.status),
        existingFriendship.is_best_friend,
        existingFriendship.created_at
      );
    } else {
      // Create new friendship
      const newFriendshipModel = friendshipModel.create({
        id: friendship.id.value,
        user_id: friendship.userId.value,
        friend_id: friendship.friendId.value,
        status: friendship.status.value,
        is_best_friend: friendship.isBestFriend,
        created_at: friendship.createdAt
      });

      const savedFriendship = await friendshipModel.save(newFriendshipModel);
      
      return new Friendship(
        new UUID(savedFriendship.id),
        new UUID(savedFriendship.user_id),
        new UUID(savedFriendship.friend_id),
        new FriendshipStatus(savedFriendship.status),
        savedFriendship.is_best_friend,
        savedFriendship.created_at
      );
    }
  }

  async findById(id: UUID): Promise<Friendship | null> {
    const friendshipModel = this.dataSource.getRepository(FriendshipModel);
    const friendship = await friendshipModel.findOne({ where: { id: id.value } });
    
    if (!friendship) return null;

    return new Friendship(
      new UUID(friendship.id),
      new UUID(friendship.user_id),
      new UUID(friendship.friend_id),
      new FriendshipStatus(friendship.status),
      friendship.is_best_friend,
      friendship.created_at
    );
  }

  async findByUserAndFriend(userId: UUID, friendId: UUID): Promise<Friendship | null> {
    const friendshipModel = this.dataSource.getRepository(FriendshipModel);
    const friendship = await friendshipModel.findOne({
      where: [
        { user_id: userId.value, friend_id: friendId.value },
        { user_id: friendId.value, friend_id: userId.value }
      ]
    });
    
    if (!friendship) return null;

    return new Friendship(
      new UUID(friendship.id),
      new UUID(friendship.user_id),
      new UUID(friendship.friend_id),
      new FriendshipStatus(friendship.status),
      friendship.is_best_friend,
      friendship.created_at
    );
  }

  async findByUserId(userId: UUID): Promise<Friendship[]> {
    const friendshipModel = this.dataSource.getRepository(FriendshipModel);
    const friendships = await friendshipModel.find({
      where: [
        { user_id: userId.value },
        { friend_id: userId.value }
      ]
    });

    return friendships.map(friendship => new Friendship(
      new UUID(friendship.id),
      new UUID(friendship.user_id),
      new UUID(friendship.friend_id),
      new FriendshipStatus(friendship.status),
      friendship.is_best_friend,
      friendship.created_at
    ));
  }

  async findByStatus(userId: UUID, status: string): Promise<Friendship[]> {
    const friendshipModel = this.dataSource.getRepository(FriendshipModel);
    const friendships = await friendshipModel.find({
      where: [
        { user_id: userId.value, status },
        { friend_id: userId.value, status }
      ]
    });

    return friendships.map(friendship => new Friendship(
      new UUID(friendship.id),
      new UUID(friendship.user_id),
      new UUID(friendship.friend_id),
      new FriendshipStatus(friendship.status),
      friendship.is_best_friend,
      friendship.created_at
    ));
  }

  async findBestFriends(userId: UUID): Promise<Friendship[]> {
    const friendshipModel = this.dataSource.getRepository(FriendshipModel);
    const friendships = await friendshipModel.find({
      where: [
        { user_id: userId.value, is_best_friend: true, status: 'ACCEPTED' },
        { friend_id: userId.value, is_best_friend: true, status: 'ACCEPTED' }
      ]
    });

    return friendships.map(friendship => new Friendship(
      new UUID(friendship.id),
      new UUID(friendship.user_id),
      new UUID(friendship.friend_id),
      new FriendshipStatus(friendship.status),
      friendship.is_best_friend,
      friendship.created_at
    ));
  }

  async delete(id: UUID): Promise<void> {
    const friendshipModel = this.dataSource.getRepository(FriendshipModel);
    await friendshipModel.delete({ id: id.value });
  }

  async exists(userId: UUID, friendId: UUID): Promise<boolean> {
    const friendshipModel = this.dataSource.getRepository(FriendshipModel);
    const count = await friendshipModel.count({
      where: [
        { user_id: userId.value, friend_id: friendId.value },
        { user_id: friendId.value, friend_id: userId.value }
      ]
    });
    
    return count > 0;
  }
} 