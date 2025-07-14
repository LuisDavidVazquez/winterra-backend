import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../../application/use-cases/AuthenticateUserUseCase';
import { LoginDTO } from '../../../application/dtos/AuthDTO';

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validar datos requeridos
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
        return;
      }

      const loginDTO: LoginDTO = {
        email,
        password
      };

      const authResponse = await this.authenticateUserUseCase.execute(loginDTO);

      res.status(200).json(authResponse);
    } catch (error) {
      console.error('Error authenticating user:', error);
      
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error during authentication'
        });
      }
    }
  }
} 