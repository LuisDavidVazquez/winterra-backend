import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { UUID } from '../../domain/value-objects/UUID';
import { RejectFriendshipDTO, FriendshipResponseDTO } from '../dtos/FriendshipDTO';

export class RejectFriendshipUseCase {
  constructor(private friendshipRepository: IFriendshipRepository) {}

  async execute(data: RejectFriendshipDTO): Promise<FriendshipResponseDTO> {
    const friendshipId = new UUID(data.friendshipId);
    const userId = new UUID(data.userId);

    // Find the friendship
    const friendship = await this.friendshipRepository.findById(friendshipId);
    if (!friendship) {
      throw new Error('Friendship not found');
    }

    // Check if the user is the one being requested (friend_id)
    if (friendship.friendId.value !== userId.value) {
      throw new Error('User is not authorized to reject this friendship request');
    }

    // Check if friendship can be rejected
    if (!friendship.canBeRejected()) {
      throw new Error('Friendship cannot be rejected. Current status: ' + friendship.status.value);
    }

    // Reject the friendship
    friendship.reject();
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