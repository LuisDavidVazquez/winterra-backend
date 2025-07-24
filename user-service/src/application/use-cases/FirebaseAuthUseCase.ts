import { UserEntity, UserPlan } from '../../domain/entities/UserEntity';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { FirebaseAuthRequestDTO, FirebaseAuthResponseDTO } from '../dtos/FirebaseAuthDTO';
import { IFirebaseService } from '../services/IFirebaseService';
import { IJWTService } from '../services/IJWTService';
import { IUUIDService } from '../services/IUUIDService';
import { Name } from '../../domain/value-objects/Name';
import { Email } from '../../domain/value-objects/Email';

export class FirebaseAuthUseCase {
  constructor(
    private userRepository: UserRepository,
    private firebaseService: IFirebaseService,
    private jwtService: IJWTService,
    private uuidService: IUUIDService
  ) {}

  async execute(authData: FirebaseAuthRequestDTO): Promise<FirebaseAuthResponseDTO> {
    // Verificar token de Firebase
    const firebaseUser = await this.firebaseService.verifyIdToken(authData.idToken);

    // Buscar usuario por Firebase UID
    let user = await this.userRepository.findByFirebaseUid(firebaseUser.uid);

    if (!user) {
      // Buscar por email como fallback
      const email = new Email(firebaseUser.email);
      user = await this.userRepository.findByEmail(email);

      if (user) {
        // Usuario existe pero no tiene Firebase UID, actualizarlo
        user.setFirebaseUid(firebaseUser.uid);
        await this.userRepository.update(user);
      } else {
        // Crear nuevo usuario
        const name = new Name(authData.userData?.name || firebaseUser.displayName || 'User');
        const emailObj = new Email(firebaseUser.email);
        const plan = authData.userData?.plan === UserPlan.PRO ? UserPlan.PRO : UserPlan.NORMAL;

        console.log('Creating new user with firebase_uid:', firebaseUser.uid);

        user = new UserEntity(
          this.uuidService.generate(),
          name,
          emailObj,
          plan,
          firebaseUser.uid
        );

        console.log('UserEntity created with firebase_uid:', user.getFirebaseUid());

        user = await this.userRepository.save(user);
      }
    }

    // Actualizar última sesión
    user.updateLastSession();
    await this.userRepository.update(user);

    // Generar JWT token del backend
    const tokenPayload = {
      userId: user.getId(),
      firebaseUid: user.getFirebaseUid(),
      email: user.getEmail().getValue(),
      plan: user.getPlan()
    };

    const token = this.jwtService.generateToken(tokenPayload);

    // Construir respuesta
    const response: FirebaseAuthResponseDTO = {
      success: true,
      data: {
        user: {
          id: user.getId(),
          firebaseUid: user.getFirebaseUid() || '',
          name: user.getName().getValue(),
          email: user.getEmail().getValue(),
          plan: user.getPlan(),
          createdAt: user.getCreatedAt().toISOString(),
          lastSessionAt: user.getLastSessionAt()?.toISOString() || null
        },
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      },
      message: 'Firebase authentication successful'
    };

    return response;
  }
} 