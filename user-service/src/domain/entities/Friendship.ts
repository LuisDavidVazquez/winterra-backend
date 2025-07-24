import { UUID } from '../value-objects/UUID';
import { FriendshipStatus } from '../value-objects/FriendshipStatus';

export class Friendship {
  constructor(
    private readonly _id: UUID,
    private readonly _userId: UUID,
    private readonly _friendId: UUID,
    private _status: FriendshipStatus,
    private _isBestFriend: boolean,
    private readonly _createdAt: Date
  ) {}

  // Getters
  get id(): UUID {
    return this._id;
  }

  get userId(): UUID {
    return this._userId;
  }

  get friendId(): UUID {
    return this._friendId;
  }

  get status(): FriendshipStatus {
    return this._status;
  }

  get isBestFriend(): boolean {
    return this._isBestFriend;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  // Business methods
  accept(): void {
    this._status = FriendshipStatus.ACCEPTED();
  }

  reject(): void {
    this._status = FriendshipStatus.REJECTED();
  }

  setAsBestFriend(): void {
    this._isBestFriend = true;
  }

  removeAsBestFriend(): void {
    this._isBestFriend = false;
  }

  // Validation methods
  canBeAccepted(): boolean {
    return this._status.value === 'PENDING';
  }

  canBeRejected(): boolean {
    return this._status.value === 'PENDING';
  }

  isAccepted(): boolean {
    return this._status.value === 'ACCEPTED';
  }

  isPending(): boolean {
    return this._status.value === 'PENDING';
  }

  isRejected(): boolean {
    return this._status.value === 'REJECTED';
  }
} 