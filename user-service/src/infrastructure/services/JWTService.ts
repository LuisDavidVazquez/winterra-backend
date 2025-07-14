import jwt from 'jsonwebtoken';
import { IJWTService } from '../../application/services/IJWTService';

export class JWTService implements IJWTService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'default-secret-key';
    this.expiresIn = process.env.JWT_EXPIRES_IN || '24h';
  }

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as jwt.SignOptions);
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
} 