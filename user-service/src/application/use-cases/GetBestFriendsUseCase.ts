import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { UUID } from '../../domain/value-objects/UUID';
import { FriendshipResponseDTO } from '../dtos/FriendshipDTO';

export class GetBestFriendsUseCase {
  constructor(private friendshipRepository: IFriendshipRepository) {}

  async execute(userId: string): Promise<FriendshipResponseDTO[]> {
    const userUUID = new UUID(userId);

    const bestFriends = await this.friendshipRepository.findBestFriends(userUUID);

    return bestFriends.map(friendship => ({
      id: friendship.id.value,
      userId: friendship.userId.value,
      friendId: friendship.friendId.value,
      status: friendship.status.value,
      isBestFriend: friendship.isBestFriend,
      createdAt: friendship.createdAt
    }));
  }
} 