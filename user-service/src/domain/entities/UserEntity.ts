import { Name } from '../value-objects/Name';
import { Email } from '../value-objects/Email';

export enum UserPlan {
  NORMAL = 1,
  PRO = 2
}

export class UserEntity {
  private readonly id: string;
  private firebaseUid: string | null;
  private name: Name;
  private email: Email;
  private plan: UserPlan;
  private readonly createdAt: Date;
  private lastSessionAt: Date | null;

  constructor(
    id: string,
    name: Name,
    email: Email,
    plan: UserPlan = UserPlan.NORMAL,
    firebaseUid?: string | null,
    createdAt?: Date,
    lastSessionAt?: Date | null
  ) {
    this.id = id;
    this.firebaseUid = firebaseUid || null;
    this.name = name;
    this.email = email;
    this.plan = plan;
    this.createdAt = createdAt || new Date();
    this.lastSessionAt = lastSessionAt || null;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): Name {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getPlan(): UserPlan {
    return this.plan;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getLastSessionAt(): Date | null {
    return this.lastSessionAt;
  }

  getFirebaseUid(): string | null {
    return this.firebaseUid;
  }

  // Business methods
  updateName(name: Name): void {
    this.name = name;
  }

  updateEmail(email: Email): void {
    this.email = email;
  }

  upgradeToPro(): void {
    this.plan = UserPlan.PRO;
  }

  downgradeToNormal(): void {
    this.plan = UserPlan.NORMAL;
  }

  updateLastSession(): void {
    this.lastSessionAt = new Date();
  }

  setFirebaseUid(firebaseUid: string): void {
    this.firebaseUid = firebaseUid;
  }

  isPro(): boolean {
    return this.plan === UserPlan.PRO;
  }

  // Domain events could be added here
  // private domainEvents: DomainEvent[] = [];

  // addDomainEvent(event: DomainEvent): void {
  //   this.domainEvents.push(event);
  // }

  // getDomainEvents(): DomainEvent[] {
  //   return this.domainEvents;
  // }

  // clearDomainEvents(): void {
  //   this.domainEvents = [];
  // }
}
