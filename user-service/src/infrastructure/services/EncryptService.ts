import bcrypt from 'bcrypt';
import { IEncryptService } from '../../application/services/IEncryptService';

export class EncryptService implements IEncryptService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
