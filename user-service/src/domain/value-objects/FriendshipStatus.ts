export class FriendshipStatus {
  private static readonly VALID_STATUSES = ['PENDING', 'ACCEPTED', 'REJECTED'] as const;
  
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate(): void {
    if (!this._value || this._value.trim().length === 0) {
      throw new Error('Friendship status cannot be empty');
    }
    
    if (!FriendshipStatus.VALID_STATUSES.includes(this._value as any)) {
      throw new Error(`Invalid friendship status. Must be one of: ${FriendshipStatus.VALID_STATUSES.join(', ')}`);
    }
  }

  equals(other: FriendshipStatus): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  // Static factory methods
  static PENDING(): FriendshipStatus {
    return new FriendshipStatus('PENDING');
  }

  static ACCEPTED(): FriendshipStatus {
    return new FriendshipStatus('ACCEPTED');
  }

  static REJECTED(): FriendshipStatus {
    return new FriendshipStatus('REJECTED');
  }
} 