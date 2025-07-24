export class UUID {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate(): void {
    if (!this._value || this._value.trim().length === 0) {
      throw new Error('UUID cannot be empty');
    }
    
    // Basic UUID format validation (8-4-4-4-12 format)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(this._value)) {
      throw new Error('Invalid UUID format');
    }
  }

  equals(other: UUID): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
} 