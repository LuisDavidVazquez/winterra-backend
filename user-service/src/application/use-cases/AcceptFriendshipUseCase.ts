import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { UUID } from '../../domain/value-objects/UUID';
import { AcceptFriendshipDTO, FriendshipResponseDTO } from '../dtos/FriendshipDTO';

export class AcceptFriendshipUseCase {
  constructor(private friendshipRepository: IFriendshipRepository) {}

  async execute(data: AcceptFriendshipDTO): Promise<FriendshipResponseDTO> {
    const friendshipId = new UUID(data.friendshipId);
    const userId = new UUID(data.userId);

    // Find the friendship
    const friendship = await this.friendshipRepository.findById(friendshipId);
    if (!friendship) {
      throw new Error('Friendship not found');
    }

    // Check if the user is the one being requested (friend_id)
    if (friendship.friendId.value !== userId.value) {
      throw new Error('User is not authorized to accept this friendship request');
    }

    // Check if friendship can be accepted
    if (!friendship.canBeAccepted()) {
      throw new Error('Friendship cannot be accepted. Current status: ' + friendship.status.value);
    }

    // Accept the friendship
    friendship.accept();
    const savedFriendship = await this.friendshipRepository.save(friendship);

    return {
      id: savedFriendship.id.value,
      userId: savedFriendship.userId.value,
      friendId: savedFriendship.friendId.value,
      status: savedFriendship.status.value,
      isBestFriend: savedFriendship.isBestFriend,
      createdAt: savedFriendship.createdAt
    };
  }
} 