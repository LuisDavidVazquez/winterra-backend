export interface FirebaseUserDTO {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  providerData: Array<{
    providerId: string;
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
  }>;
}

export interface FirebaseAuthRequestDTO {
  idToken: string; // Firebase ID token
  userData?: {
    name?: string;
    plan?: number;
  };
}

export interface FirebaseAuthResponseDTO {
  success: boolean;
  data: {
    user: {
      id: string;
      firebaseUid: string;
      name: string;
      email: string;
      plan: number;
      createdAt: string;
      lastSessionAt: string | null;
    };
    token: string; // JWT token del backend
    firebaseToken: string; // Token personalizado de Firebase
    expiresIn: string;
    isNew: boolean; // Indica si es un usuario nuevo
  };
  message: string;
} 