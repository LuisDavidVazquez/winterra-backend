export class RoutineDays {
  private readonly value: string;

  constructor(routineDays: string) {
    this.validate(routineDays);
    this.value = routineDays;
  }

  private validate(routineDays: string): void {
    if (!routineDays || routineDays.length !== 7) {
      throw new Error('Routine days must be exactly 7 characters long');
    }

    // Validar que solo contenga 0s y 1s
    if (!/^[01]{7}$/.test(routineDays)) {
      throw new Error('Routine days must contain only 0s and 1s');
    }

    // Validar que al menos un día esté activo
    if (!routineDays.includes('1')) {
      throw new Error('At least one day must be active in the routine');
    }
  }

  getValue(): string {
    return this.value;
  }

  isActiveOnDay(dayIndex: number): boolean {
    if (dayIndex < 0 || dayIndex > 6) {
      throw new Error('Day index must be between 0 and 6');
    }
    return this.value[dayIndex] === '1';
  }

  getActiveDays(): number[] {
    const activeDays: number[] = [];
    for (let i = 0; i < 7; i++) {
      if (this.value[i] === '1') {
        activeDays.push(i);
      }
    }
    return activeDays;
  }

  getDayNames(): string[] {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return this.getActiveDays().map(dayIndex => dayNames[dayIndex]);
  }

  equals(other: RoutineDays): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
} 