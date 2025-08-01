import { v4 as uuidv4 } from 'uuid';
import { IUUIDService } from '../../application/services/IUUIDService';

export class UUIDService implements IUUIDService {
  generate(): string {
    return uuidv4();
  }
} 