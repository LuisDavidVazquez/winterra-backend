// Request DTOs
export interface CreateCommentRequestDTO {
  userId: string;
  postId: string;
  content: string;
}

export interface UpdateCommentRequestDTO {
  content: string;
}

// Response DTOs
export interface CommentResponseDTO {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: string;
  contentLength: number;
  isShortComment: boolean;
  isLongComment: boolean;
  contentPreview: string;
  daysSinceCreated: number;
  isRecent: boolean;
}

export interface CreateCommentResponseDTO {
  success: boolean;
  data: CommentResponseDTO;
  message: string;
}

export interface GetCommentResponseDTO {
  success: boolean;
  data: CommentResponseDTO | null;
  message: string;
}

export interface GetAllCommentsResponseDTO {
  success: boolean;
  data: CommentResponseDTO[];
  message: string;
}

export interface GetPostCommentsResponseDTO {
  success: boolean;
  data: CommentResponseDTO[];
  message: string;
}

export interface UpdateCommentResponseDTO {
  success: boolean;
  data: CommentResponseDTO;
  message: string;
}

export interface DeleteCommentResponseDTO {
  success: boolean;
  data: null;
  message: string;
} 