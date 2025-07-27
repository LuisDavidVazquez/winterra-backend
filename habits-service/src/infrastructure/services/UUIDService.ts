import { IUUIDService } from '../../domain/services/IUUIDService';
import { v4 as uuidv4 } from 'uuid';

export class UUIDService implements IUUIDService {
  generate(): string {
    return uuidv4();
  }
} 