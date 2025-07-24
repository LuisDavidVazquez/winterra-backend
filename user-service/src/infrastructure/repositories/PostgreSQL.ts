import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/db/database';
import { UserModel } from '../models/UserModel';
import { UserEntity, UserPlan } from '../../domain/entities/UserEntity';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { Email } from '../../domain/value-objects/Email';
import { Name } from '../../domain/value-objects/Name';

export class PostgreSQLUserRepository implements UserRepository {
  private repository: Repository<UserModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserModel);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userModel = new UserModel();
    userModel.id = user.getId();
    userModel.name = user.getName().getValue();
    userModel.email = user.getEmail().getValue();
    userModel.firebase_uid = user.getFirebaseUid();
    userModel.plan_id = user.getPlan();
    userModel.created_at = user.getCreatedAt();
    userModel.last_session_at = user.getLastSessionAt() || null;

    // Debug logs
    console.log('Saving user with firebase_uid:', userModel.firebase_uid);
    console.log('User entity firebase_uid:', user.getFirebaseUid());

    const savedModel = await this.repository.save(userModel);
    return this.mapToEntity(savedModel);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const userModel = await this.repository.findOne({
      where: { id },
      relations: ['plan']
    });

    if (!userModel) {
      return null;
    }

    return this.mapToEntity(userModel);
  }

  async findByEmail(email: Email): Promise<UserEntity | null> {
    const userModel = await this.repository.findOne({
      where: { email: email.getValue() },
      relations: ['plan']
    });

    if (!userModel) {
      return null;
    }

    return this.mapToEntity(userModel);
  }

  async findByFirebaseUid(firebaseUid: string): Promise<UserEntity | null> {
    const userModel = await this.repository.findOne({
      where: { firebase_uid: firebaseUid },
      relations: ['plan']
    });

    if (!userModel) {
      return null;
    }

    return this.mapToEntity(userModel);
  }

  async findAll(): Promise<UserEntity[]> {
    const userModels = await this.repository.find({
      relations: ['plan']
    });

    return userModels.map(model => this.mapToEntity(model));
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const userModel = await this.repository.findOne({
      where: { id: user.getId() }
    });

    if (!userModel) {
      throw new Error('User not found');
    }

    userModel.name = user.getName().getValue();
    userModel.email = user.getEmail().getValue();
    userModel.firebase_uid = user.getFirebaseUid();
    userModel.plan_id = user.getPlan();
    userModel.last_session_at = user.getLastSessionAt() || null;

    const updatedModel = await this.repository.save(userModel);
    return this.mapToEntity(updatedModel);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const count = await this.repository.count({
      where: { email: email.getValue() }
    });
    return count > 0;
  }

  async existsByFirebaseUid(firebaseUid: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { firebase_uid: firebaseUid }
    });
    return count > 0;
  }

  private mapToEntity(userModel: UserModel): UserEntity {
    const name = new Name(userModel.name);
    const email = new Email(userModel.email);
    const plan = userModel.plan_id as UserPlan;

    return new UserEntity(
      userModel.id,
      name,
      email,
      plan,
      userModel.firebase_uid,
      userModel.created_at,
      userModel.last_session_at
    );
  }
}
