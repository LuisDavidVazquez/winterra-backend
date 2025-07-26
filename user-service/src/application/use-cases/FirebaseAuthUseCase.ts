import { UserEntity, UserPlan } from '../../domain/entities/UserEntity';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { FirebaseAuthRequestDTO, FirebaseAuthResponseDTO } from '../dtos/FirebaseAuthDTO';
import { IFirebaseService } from '../services/IFirebaseService';
import { IJWTService } from '../services/IJWTService';
import { IUUIDService } from '../services/IUUIDService';
import { IEmailService } from '../services/IEmailService';
import { UserEventService } from '../../infrastructure/events/UserEventService';
import { Name } from '../../domain/value-objects/Name';
import { Email } from '../../domain/value-objects/Email';

export class FirebaseAuthUseCase {
  constructor(
    private userRepository: UserRepository,
    private firebaseService: IFirebaseService,
    private jwtService: IJWTService,
    private uuidService: IUUIDService,
    private emailService: IEmailService,
    private userEventService: UserEventService
  ) {}

  async execute(authData: FirebaseAuthRequestDTO): Promise<FirebaseAuthResponseDTO> {
    // Verificar token de Firebase
    const firebaseUser = await this.firebaseService.verifyIdToken(authData.idToken);

    // Buscar usuario por Firebase UID
    let user = await this.userRepository.findByFirebaseUid(firebaseUser.uid);
    let isNewUser = false;

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
        isNewUser = true;
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
        
        // Enviar correo de bienvenida para nuevos usuarios
        try {
          await this.emailService.sendWelcomeEmail({
            id: user.getId(),
            name: user.getName().getValue(),
            email: user.getEmail().getValue(),
            plan: user.getPlan(),
            joinDate: user.getCreatedAt()
          });
          console.log('Correo de bienvenida enviado exitosamente');
        } catch (error) {
          console.error('Error enviando correo de bienvenida:', error);
          // No fallar la autenticación si el correo falla
        }

        // Publicar evento de usuario creado
        try {
          await this.userEventService.publishUserCreatedEvent({
            id: user.getId(),
            firebaseUid: user.getFirebaseUid() || '',
            name: user.getName().getValue(),
            email: user.getEmail().getValue(),
            plan: user.getPlan(),
            createdAt: user.getCreatedAt()
          });
          console.log('Evento de usuario creado publicado exitosamente');
        } catch (error) {
          console.error('Error publicando evento de usuario creado:', error);
          // No fallar la autenticación si el evento falla
        }
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
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        isNew: isNewUser
      },
      message: 'Firebase authentication successful'
    };

    return response;
  }
} 