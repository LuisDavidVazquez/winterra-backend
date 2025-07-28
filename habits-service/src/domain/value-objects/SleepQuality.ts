export class SleepQuality {
  private readonly value: string;

  constructor(quality: string) {
    this.validate(quality);
    this.value = quality.toLowerCase();
  }

  private validate(quality: string): void {
    const validQualities = ['excelente', 'muy buena', 'buena', 'regular', 'mala'];
    
    if (!validQualities.includes(quality.toLowerCase())) {
      throw new Error('Sleep quality must be one of: excelente, muy buena, buena, regular, mala');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: SleepQuality): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
} 