import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UUID } from '../../domain/value-objects/UUID';
import { FriendshipResponseDTO } from '../dtos/FriendshipDTO';

export interface PendingFriendRequestDTO extends FriendshipResponseDTO {
  requester: {
    id: string;
    name: string;
    email: string;
  };
}

export class GetPendingFriendRequestsUseCase {
  constructor(
    private friendshipRepository: IFriendshipRepository,
    private userRepository: UserRepository
  ) {}

  async execute(userId: string): Promise<PendingFriendRequestDTO[]> {
    const userUUID = new UUID(userId);

    // Get all friendships where the user is the friend_id and status is PENDING
    const friendships = await this.friendshipRepository.findByStatus(userUUID, 'PENDING');
    
    // Filter only the ones where the user is the friend_id (received requests)
    const receivedRequests = friendships.filter(friendship => 
      friendship.friendId.value === userId
    );

    // Get requester information for each request
    const requestsWithRequesterInfo = await Promise.all(
      receivedRequests.map(async (friendship) => {
        const requester = await this.userRepository.findById(friendship.userId.value);
        
        return {
          id: friendship.id.value,
          userId: friendship.userId.value,
          friendId: friendship.friendId.value,
          status: friendship.status.value,
          isBestFriend: friendship.isBestFriend,
          createdAt: friendship.createdAt,
          requester: {
            id: requester?.getId() || '',
            name: requester?.getName().getValue() || '',
            email: requester?.getEmail().getValue() || ''
          }
        };
      })
    );

    return requestsWithRequesterInfo;
  }
} 