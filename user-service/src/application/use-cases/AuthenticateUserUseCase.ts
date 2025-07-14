import { UserEntity } from '../../domain/entities/UserEntity';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { LoginDTO, AuthResponseDTO } from '../dtos/AuthDTO';
import { IEncryptService } from '../services/IEncryptService';
import { IJWTService } from '../services/IJWTService';
import { Email } from '../../domain/value-objects/Email';

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private encryptService: IEncryptService,
    private jwtService: IJWTService
  ) {}

  async execute(loginData: LoginDTO): Promise<AuthResponseDTO> {
    // Crear value object para email
    const email = new Email(loginData.email);

    // Buscar usuario por email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verificar contraseña
    const isPasswordValid = await this.encryptService.compare(
      loginData.password,
      user.getPassword().getValue()
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Actualizar última sesión
    user.updateLastSession();

    // Generar token JWT
    const tokenPayload = {
      userId: user.getId(),
      email: user.getEmail().getValue(),
      plan: user.getPlan()
    };

    const token = this.jwtService.generateToken(tokenPayload);

    // Actualizar usuario en la base de datos
    await this.userRepository.update(user);

    // Construir respuesta
    const response: AuthResponseDTO = {
      success: true,
      data: {
        user: {
          id: user.getId(),
          name: user.getName().getValue(),
          email: user.getEmail().getValue(),
          plan: user.getPlan()
        },
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      },
      message: 'Authentication successful'
    };

    return response;
  }
} 