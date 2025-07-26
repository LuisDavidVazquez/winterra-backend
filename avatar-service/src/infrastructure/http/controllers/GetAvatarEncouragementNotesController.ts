import { Request, Response } from 'express';
import { GetAvatarEncouragementNotesUseCase } from '../../../application/use-cases/GetAvatarEncouragementNotesUseCase';

export class GetAvatarEncouragementNotesController {
  constructor(private getAvatarEncouragementNotesUseCase: GetAvatarEncouragementNotesUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const avatarId = req.params.avatarId;

      const result = await this.getAvatarEncouragementNotesUseCase.execute(avatarId);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
} 