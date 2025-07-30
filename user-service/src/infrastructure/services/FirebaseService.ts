import * as admin from 'firebase-admin';
import { IFirebaseService } from '../../application/services/IFirebaseService';
import { FirebaseUserDTO } from '../../application/dtos/FirebaseAuthDTO';
import * as path from 'path';
import * as fs from 'fs';

export class FirebaseService implements IFirebaseService {
  private app: admin.app.App;

  constructor() {
    // Initialize Firebase Admin SDK usando el archivo de credenciales JSON
    if (!admin.apps.length) {
      // Buscar el archivo de credenciales en diferentes ubicaciones
      const possiblePaths = [
        path.resolve(__dirname, '../../../winterra-8cf29-firebase-adminsdk-fbsvc-009018b663.json'), // Desarrollo
        path.resolve(__dirname, '../../winterra-8cf29-firebase-adminsdk-fbsvc-009018b663.json'), // Producción (Docker)
        path.resolve(process.cwd(), 'winterra-8cf29-firebase-adminsdk-fbsvc-009018b663.json'), // Directorio raíz
        path.resolve(process.cwd(), 'dist/winterra-8cf29-firebase-adminsdk-fbsvc-009018b663.json') // Directorio dist
      ];

      let serviceAccountPath = null;
      for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
          serviceAccountPath = possiblePath;
          break;
        }
      }

      if (!serviceAccountPath) {
        throw new Error('Firebase service account file not found. Tried paths: ' + possiblePaths.join(', '));
      }

      const serviceAccount = require(serviceAccountPath);
      
      this.app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      this.app = admin.app();
    }
  }

  async verifyIdToken(idToken: string): Promise<FirebaseUserDTO> {
    try {
      const decodedToken = await this.app.auth().verifyIdToken(idToken);
      
      return {
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        displayName: decodedToken.name || undefined,
        photoURL: decodedToken.picture || undefined,
        emailVerified: decodedToken.email_verified || false,
        providerData: decodedToken.provider_id ? [{
          providerId: decodedToken.provider_id,
          uid: decodedToken.uid,
          displayName: decodedToken.name || undefined,
          email: decodedToken.email || undefined,
          photoURL: decodedToken.picture || undefined
        }] : []
      };
    } catch (error) {
      throw new Error('Invalid Firebase ID token');
    }
  }

  async getUserByUid(uid: string): Promise<FirebaseUserDTO> {
    try {
      const userRecord = await this.app.auth().getUser(uid);
      
      return {
        uid: userRecord.uid,
        email: userRecord.email || '',
        displayName: userRecord.displayName || undefined,
        photoURL: userRecord.photoURL || undefined,
        emailVerified: userRecord.emailVerified,
        providerData: userRecord.providerData.map(provider => ({
          providerId: provider.providerId,
          uid: provider.uid,
          displayName: provider.displayName || undefined,
          email: provider.email || undefined,
          photoURL: provider.photoURL || undefined
        }))
      };
    } catch (error) {
      throw new Error('Firebase user not found');
    }
  }

  async createCustomToken(uid: string, additionalClaims?: object): Promise<string> {
    try {
      const customToken = await this.app.auth().createCustomToken(uid, additionalClaims);
      return customToken;
    } catch (error) {
      throw new Error('Failed to create Firebase custom token');
    }
  }
} 