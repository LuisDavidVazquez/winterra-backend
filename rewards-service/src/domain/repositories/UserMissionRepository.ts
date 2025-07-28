import { UserMissionEntity } from '../entities/UserMissionEntity';

export interface UserMissionRepository {
  save(userMission: UserMissionEntity): Promise<UserMissionEntity>;
  findById(id: string): Promise<UserMissionEntity | null>;
  findByUserHabitsId(userHabitsId: string): Promise<UserMissionEntity[]>;
  findByMissionId(missionId: string): Promise<UserMissionEntity[]>;
  findByStatus(status: string): Promise<UserMissionEntity[]>;
  findAll(): Promise<UserMissionEntity[]>;
  update(userMission: UserMissionEntity): Promise<UserMissionEntity>;
  delete(id: string): Promise<void>;
  deleteByUserHabitsId(userHabitsId: string): Promise<void>;
  findByUserHabitsIdAndStatus(userHabitsId: string, status: string): Promise<UserMissionEntity[]>;
  findCompletedByUserHabitsId(userHabitsId: string): Promise<UserMissionEntity[]>;
  findInProgressByUserHabitsId(userHabitsId: string): Promise<UserMissionEntity[]>;
} 