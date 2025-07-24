import { Request, Response } from 'express';
import { FirebaseAuthUseCase } from '../../../application/use-cases/FirebaseAuthUseCase';
import { FirebaseAuthRequestDTO } from '../../../application/dtos/FirebaseAuthDTO';

export class FirebaseAuthController {
  constructor(private firebaseAuthUseCase: FirebaseAuthUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { idToken, userData } = req.body;

      // Validar datos requeridos
      if (!idToken) {
        res.status(400).json({
          success: false,
          message: 'Firebase ID token is required'
        });
        return;
      }

      const authData: FirebaseAuthRequestDTO = {
        idToken,
        userData
      };

      const authResponse = await this.firebaseAuthUseCase.execute(authData);

      res.status(200).json(authResponse);
    } catch (error) {
      console.error('Error with Firebase authentication:', error);
      
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error during Firebase authentication'
        });
      }
    }
  }
} 