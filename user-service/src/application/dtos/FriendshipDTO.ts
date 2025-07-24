export interface CreateFriendshipDTO {
  userId: string;
  friendId: string;
}

export interface AcceptFriendshipDTO {
  friendshipId: string;
  userId: string;
}

export interface RejectFriendshipDTO {
  friendshipId: string;
  userId: string;
}

export interface SetBestFriendDTO {
  friendshipId: string;
  userId: string;
}

export interface RemoveBestFriendDTO {
  friendshipId: string;
  userId: string;
}

export interface DeleteFriendshipDTO {
  friendshipId: string;
  userId: string;
}

export interface FriendshipResponseDTO {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  isBestFriend: boolean;
  createdAt: Date;
}

export interface GetFriendshipsDTO {
  userId: string;
  status?: string;
} 