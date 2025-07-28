import { DataSource } from 'typeorm';
import { HabitCategoryModel } from '../../src/infrastructure/models/HabitCategoryModel';
import { HabitModel } from '../../src/infrastructure/models/HabitModel';
import { UserHabitModel } from '../../src/infrastructure/models/UserHabitModel';
import { StudySessionModel } from '../../src/infrastructure/models/StudySessionModel';
import { SleepSessionModel } from '../../src/infrastructure/models/SleepSessionModel';
import { HabitDuelModel } from '../../src/infrastructure/models/HabitDuelModel';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'habits_service',
  synchronize: process.env.NODE_ENV === 'development',
  ssl: {
    rejectUnauthorized: false,
  },
  logging: process.env.NODE_ENV === 'development',
  entities: [HabitCategoryModel, HabitModel, UserHabitModel, StudySessionModel, SleepSessionModel, HabitDuelModel],
  subscribers: [],
  migrations: [],
});

export async function initializeDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}
