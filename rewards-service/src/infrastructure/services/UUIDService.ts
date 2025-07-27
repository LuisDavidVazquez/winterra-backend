import { v4 as uuidv4 } from 'uuid';

export class UUIDService {
  generate(): string {
    return uuidv4();
  }
} 