import { Request, Response } from 'express';
import { GetAllUsersUseCase } from '../../../application/use-cases/GetAllUsersUseCase';
import { GetAllUsersResponseDTO } from '../../../application/dtos/UserResponseDTO';

export class GetAllUsersController {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getAllUsersUseCase.execute();

      const response: GetAllUsersResponseDTO = {
        success: true,
        data: users,
        message: `Found ${users.length} users`,
        total: users.length
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error getting all users:', error);
      
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching users',
        data: [],
        total: 0
      });
    }
  }
} 