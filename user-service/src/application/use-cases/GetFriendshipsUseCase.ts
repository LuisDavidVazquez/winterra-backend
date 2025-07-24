import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { UUID } from '../../domain/value-objects/UUID';
import { GetFriendshipsDTO, FriendshipResponseDTO } from '../dtos/FriendshipDTO';

export class GetFriendshipsUseCase {
  constructor(private friendshipRepository: IFriendshipRepository) {}

  async execute(data: GetFriendshipsDTO): Promise<FriendshipResponseDTO[]> {
    const userId = new UUID(data.userId);

    let friendships;
    if (data.status) {
      friendships = await this.friendshipRepository.findByStatus(userId, data.status);
    } else {
      friendships = await this.friendshipRepository.findByUserId(userId);
    }

    return friendships.map(friendship => ({
      id: friendship.id.value,
      userId: friendship.userId.value,
      friendId: friendship.friendId.value,
      status: friendship.status.value,
      isBestFriend: friendship.isBestFriend,
      createdAt: friendship.createdAt
    }));
  }
} 