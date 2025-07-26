// Request DTOs
export interface CreateReactionRequestDTO {
  userId: string;
  postId: string;
}

// Response DTOs
export interface ReactionResponseDTO {
  id: string;
  userId: string;
  postId: string;
  reactedAt: string;
  daysSinceReaction: number;
  isRecentReaction: boolean;
  isToday: boolean;
}

export interface CreateReactionResponseDTO {
  success: boolean;
  data: ReactionResponseDTO;
  message: string;
}

export interface GetReactionResponseDTO {
  success: boolean;
  data: ReactionResponseDTO | null;
  message: string;
}

export interface GetAllReactionsResponseDTO {
  success: boolean;
  data: ReactionResponseDTO[];
  message: string;
}

export interface GetPostReactionsResponseDTO {
  success: boolean;
  data: ReactionResponseDTO[];
  message: string;
}

export interface DeleteReactionResponseDTO {
  success: boolean;
  data: null;
  message: string;
}

export interface ReactionCountResponseDTO {
  success: boolean;
  data: {
    postId: string;
    reactionCount: number;
  };
  message: string;
} 