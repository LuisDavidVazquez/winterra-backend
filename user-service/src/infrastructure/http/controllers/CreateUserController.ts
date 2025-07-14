import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../application/use-cases/CreateUserUseCase';
import { CreateUserDTO } from '../../../application/dtos/CreateUserDTO';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, plan } = req.body;

      // Validar datos requeridos
      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Name, email and password are required'
        });
        return;
      }

      const createUserDTO: CreateUserDTO = {
        name,
        email,
        password,
        plan
      };

      const user = await this.createUserUseCase.execute(createUserDTO);

      res.status(201).json({
        success: true,
        data: {
          id: user.getId(),
          name: user.getName().getValue(),
          email: user.getEmail().getValue(),
          plan: user.getPlan(),
          createdAt: user.getCreatedAt(),
          lastSessionAt: user.getLastSessionAt()
        },
        message: 'User created successfully'
      });
    } catch (error) {
      console.error('Error creating user:', error);
      
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }
}
