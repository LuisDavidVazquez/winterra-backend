import { FirebaseUserDTO } from '../dtos/FirebaseAuthDTO';
 
export interface IFirebaseService {
  verifyIdToken(idToken: string): Promise<FirebaseUserDTO>;
  getUserByUid(uid: string): Promise<FirebaseUserDTO>;
  createCustomToken(uid: string, additionalClaims?: object): Promise<string>;
} 