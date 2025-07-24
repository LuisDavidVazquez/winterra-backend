import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { UUID } from '../../domain/value-objects/UUID';
import { DeleteFriendshipDTO } from '../dtos/FriendshipDTO';

export class DeleteFriendshipUseCase {
  constructor(private friendshipRepository: IFriendshipRepository) {}

  async execute(data: DeleteFriendshipDTO): Promise<void> {
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

    // Delete the friendship
    await this.friendshipRepository.delete(friendshipId);
  }
} 