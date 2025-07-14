import { UserEntity, UserPlan } from '../../domain/entities/UserEntity';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IEncryptService } from '../services/IEncryptService';
import { IUUIDService } from '../services/IUUIDService';
import { Name } from '../../domain/value-objects/Name';
import { Email } from '../../domain/value-objects/Email';
import { Password } from '../../domain/value-objects/Password';
import { UserEventService } from '../../infrastructure/events/UserEventService';

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private encryptService: IEncryptService,
    private uuidService: IUUIDService,
    private userEventService: UserEventService
  ) {}

  async execute(data: CreateUserDTO): Promise<UserEntity> {
    // Crear value objects
    const name = new Name(data.name);
    const email = new Email(data.email);
    const password = new Password(data.password);

    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generar ID único
    const id = this.uuidService.generate();

    // Encriptar contraseña
    const hashedPassword = await this.encryptService.hash(password.getValue());

    // Crear contraseña encriptada
    const encryptedPassword = new Password(hashedPassword);

    // Determinar el plan
    const plan = data.plan === UserPlan.PRO ? UserPlan.PRO : UserPlan.NORMAL;

    // Crear la entidad de usuario
    const user = new UserEntity(
      id,
      name,
      email,
      encryptedPassword,
      plan
    );

    // Guardar en el repositorio
    const savedUser = await this.userRepository.save(user);

    // Publicar evento de usuario creado
    try {
      await this.userEventService.publishUserCreated(savedUser);
    } catch (error) {
      console.error('Failed to publish user created event:', error);
      // No lanzamos el error para no fallar la creación del usuario
    }

    return savedUser;
  }
}
