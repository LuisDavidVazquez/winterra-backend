import { IFriendshipRepository } from '../../domain/repositories/IFriendshipRepository';
import { Friendship } from '../../domain/entities/Friendship';
import { UUID } from '../../domain/value-objects/UUID';
import { FriendshipStatus } from '../../domain/value-objects/FriendshipStatus';
import { CreateFriendshipDTO, FriendshipResponseDTO } from '../dtos/FriendshipDTO';
import { IUUIDService } from '../services/IUUIDService';

export class CreateFriendshipUseCase {
  constructor(
    private friendshipRepository: IFriendshipRepository,
    private uuidService: IUUIDService
  ) {}

  async execute(data: CreateFriendshipDTO): Promise<FriendshipResponseDTO> {
    const userId = new UUID(data.userId);
    const friendId = new UUID(data.friendId);

    // Check if users are trying to be friends with themselves
    if (userId.value === friendId.value) {
      throw new Error('Users cannot be friends with themselves');
    }

    // Check if friendship already exists
    const existingFriendship = await this.friendshipRepository.exists(userId, friendId);
    if (existingFriendship) {
      throw new Error('Friendship already exists between these users');
    }

    // Create new friendship
    const friendship = new Friendship(
      new UUID(this.uuidService.generate()),
      userId,
      friendId,
      FriendshipStatus.PENDING(),
      false,
      new Date()
    );

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