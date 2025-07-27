export class SleepQuality {
  private readonly value: string;

  constructor(quality: string) {
    this.validate(quality);
    this.value = quality.toLowerCase();
  }

  private validate(quality: string): void {
    const validQualities = ['buena', 'media', 'mala'];
    
    if (!validQualities.includes(quality.toLowerCase())) {
      throw new Error('Sleep quality must be one of: buena, media, mala');
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