import { Request, Response } from 'express';
import { CreateHabitDuelUseCase } from '../../../application/use-cases/CreateHabitDuelUseCase';
import { GetAllHabitDuelsUseCase } from '../../../application/use-cases/GetAllHabitDuelsUseCase';
import { GetHabitDuelByIdUseCase } from '../../../application/use-cases/GetHabitDuelByIdUseCase';
import { AcceptHabitDuelUseCase } from '../../../application/use-cases/AcceptHabitDuelUseCase';
import { RejectHabitDuelUseCase } from '../../../application/use-cases/RejectHabitDuelUseCase';
import { CompleteHabitDuelUseCase } from '../../../application/use-cases/CompleteHabitDuelUseCase';
import { GetDuelsByUserIdUseCase } from '../../../application/use-cases/GetDuelsByUserIdUseCase';
import { DeleteHabitDuelUseCase } from '../../../application/use-cases/DeleteHabitDuelUseCase';
import { CreateHabitDuelDTO, AcceptDuelDTO, RejectDuelDTO, CompleteDuelDTO } from '../../../application/dtos/HabitDuelDTO';

export class HabitDuelController {
  constructor(
    private createHabitDuelUseCase: CreateHabitDuelUseCase,
    private getAllHabitDuelsUseCase: GetAllHabitDuelsUseCase,
    private getHabitDuelByIdUseCase: GetHabitDuelByIdUseCase,
    private acceptHabitDuelUseCase: AcceptHabitDuelUseCase,
    private rejectHabitDuelUseCase: RejectHabitDuelUseCase,
    private completeHabitDuelUseCase: CompleteHabitDuelUseCase,
    private getDuelsByUserIdUseCase: GetDuelsByUserIdUseCase,
    private deleteHabitDuelUseCase: DeleteHabitDuelUseCase
  ) {}

  async createHabitDuel(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateHabitDuelDTO = req.body;
      const result = await this.createHabitDuelUseCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async getAllHabitDuels(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getAllHabitDuelsUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async getHabitDuelById(req: Request, res: Response): Promise<void> {
    try {
      const duelId = req.params.id;
      const result = await this.getHabitDuelByIdUseCase.execute(duelId);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async acceptHabitDuel(req: Request, res: Response): Promise<void> {
    try {
      const data: AcceptDuelDTO = req.body;
      const result = await this.acceptHabitDuelUseCase.execute(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async rejectHabitDuel(req: Request, res: Response): Promise<void> {
    try {
      const data: RejectDuelDTO = req.body;
      const result = await this.rejectHabitDuelUseCase.execute(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async completeHabitDuel(req: Request, res: Response): Promise<void> {
    try {
      const data: CompleteDuelDTO = req.body;
      const result = await this.completeHabitDuelUseCase.execute(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async getDuelsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const result = await this.getDuelsByUserIdUseCase.execute(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async deleteHabitDuel(req: Request, res: Response): Promise<void> {
    try {
      const duelId = req.params.id;
      await this.deleteHabitDuelUseCase.execute(duelId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
} 