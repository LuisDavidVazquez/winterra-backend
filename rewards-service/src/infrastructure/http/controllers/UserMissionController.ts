import { Request, Response } from 'express';
import { AssignMissionUseCase } from '../../../application/use-cases/AssignMissionUseCase';
import { UpdateUserMissionProgressUseCase } from '../../../application/use-cases/UpdateUserMissionProgressUseCase';
import { GetUserMissionsUseCase } from '../../../application/use-cases/GetUserMissionsUseCase';
import { AssignMissionDTO, UpdateProgressDTO } from '../../../application/dtos/UserMissionDTO';

export class UserMissionController {
  constructor(
    private assignMissionUseCase: AssignMissionUseCase,
    private updateUserMissionProgressUseCase: UpdateUserMissionProgressUseCase,
    private getUserMissionsUseCase: GetUserMissionsUseCase
  ) {}

  async assignMission(req: Request, res: Response): Promise<void> {
    try {
      const data: AssignMissionDTO = req.body;
      const result = await this.assignMissionUseCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async updateProgress(req: Request, res: Response): Promise<void> {
    try {
      const userMissionId = req.params.userMissionId;
      const data: UpdateProgressDTO = req.body;
      const result = await this.updateUserMissionProgressUseCase.execute(userMissionId, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async getUserMissions(req: Request, res: Response): Promise<void> {
    try {
      const userHabitsId = req.params.userHabitsId;
      const result = await this.getUserMissionsUseCase.execute(userHabitsId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 