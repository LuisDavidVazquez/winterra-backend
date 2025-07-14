export class Name {
  private readonly value: string;

  constructor(name: string) {
    this.validate(name);
    this.value = name.trim();
  }

  private validate(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }

    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    if (name.length > 255) {
      throw new Error('Name is too long');
    }

    // Validar que solo contenga letras, espacios y algunos caracteres especiales
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!nameRegex.test(name)) {
      throw new Error('Name contains invalid characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Name): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
} 