// Request DTOs
export interface CreatePostRequestDTO {
  userId: string;
  content: string;
  imageUrl?: string;
}

export interface UpdatePostRequestDTO {
  content: string;
  imageUrl?: string;
}

// Response DTOs
export interface PostResponseDTO {
  id: string;
  userId: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  contentLength: number;
  isShortPost: boolean;
  isLongPost: boolean;
  contentPreview: string;
  hasImage: boolean;
  daysSinceCreated: number;
  isRecent: boolean;
}

export interface CreatePostResponseDTO {
  success: boolean;
  data: PostResponseDTO;
  message: string;
}

export interface GetPostResponseDTO {
  success: boolean;
  data: PostResponseDTO | null;
  message: string;
}

export interface GetAllPostsResponseDTO {
  success: boolean;
  data: PostResponseDTO[];
  message: string;
}

export interface UpdatePostResponseDTO {
  success: boolean;
  data: PostResponseDTO;
  message: string;
}

export interface DeletePostResponseDTO {
  success: boolean;
  data: null;
  message: string;
} 