import { Request, Response } from 'express';
import { CreateMissionUseCase } from '../../../application/use-cases/CreateMissionUseCase';
import { GetAllMissionsUseCase } from '../../../application/use-cases/GetAllMissionsUseCase';
import { GetMissionsByHabitIdUseCase } from '../../../application/use-cases/GetMissionsByHabitIdUseCase';
import { CreateMissionDTO } from '../../../application/dtos/MissionDTO';

export class MissionController {
  constructor(
    private createMissionUseCase: CreateMissionUseCase,
    private getAllMissionsUseCase: GetAllMissionsUseCase,
    private getMissionsByHabitIdUseCase: GetMissionsByHabitIdUseCase
  ) {}

  async createMission(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateMissionDTO = req.body;
      const result = await this.createMissionUseCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async getAllMissions(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllMissionsUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async getMissionsByHabitId(req: Request, res: Response): Promise<void> {
    try {
      const habitId = parseInt(req.params.habitId);
      if (isNaN(habitId)) {
        res.status(400).json({ error: 'Invalid habit ID' });
        return;
      }
      
      const result = await this.getMissionsByHabitIdUseCase.execute(habitId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 