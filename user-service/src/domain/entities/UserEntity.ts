import { Name } from '../value-objects/Name';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';

export enum UserPlan {
  NORMAL = 1,
  PRO = 2
}

export class UserEntity {
  private readonly id: string;
  private name: Name;
  private email: Email;
  private password: Password;
  private plan: UserPlan;
  private readonly createdAt: Date;
  private lastSessionAt: Date | null;

  constructor(
    id: string,
    name: Name,
    email: Email,
    password: Password,
    plan: UserPlan = UserPlan.NORMAL,
    createdAt?: Date,
    lastSessionAt?: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
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

  getPassword(): Password {
    return this.password;
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

  // Business methods
  updateName(name: Name): void {
    this.name = name;
  }

  updateEmail(email: Email): void {
    this.email = email;
  }

  updatePassword(password: Password): void {
    this.password = password;
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
