import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PlanModel } from './PlanModel';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firebase_uid: string | null;

  @Column({ type: 'int', default: 1 })
  plan_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_session_at: Date | null;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PlanModel, plan => plan.users)
  @JoinColumn({ name: 'plan_id' })
  plan: PlanModel;
}
