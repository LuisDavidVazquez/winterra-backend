import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { UUID } from '../../domain/value-objects/UUID';
import { SetBestFriendDTO, FriendshipResponseDTO } from '../dtos/FriendshipDTO';

export class SetBestFriendUseCase {
  constructor(private friendshipRepository: IFriendshipRepository) {}

  async execute(data: SetBestFriendDTO): Promise<FriendshipResponseDTO> {
    const friendshipId = new UUID(data.friendshipId);
    const userId = new UUID(data.userId);

    // Find the friendship
    const friendship = await this.friendshipRepository.findById(friendshipId);
    if (!friendship) {
      throw new Error('Friendship not found');
    }

    // Check if the user is part of this friendship
    if (friendship.userId.value !== userId.value && friendship.friendId.value !== userId.value) {
      throw new Error('User is not part of this friendship');
    }

    // Check if friendship is accepted
    if (!friendship.isAccepted()) {
      throw new Error('Cannot set best friend. Friendship must be accepted first');
    }

    // Set as best friend
    friendship.setAsBestFriend();
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