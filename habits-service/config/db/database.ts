import { DataSource } from 'typeorm';
import { HabitTypeModel } from '../../src/infrastructure/models/HabitTypeModel';
import { HabitCategoryModel } from '../../src/infrastructure/models/HabitCategoryModel';
import { HabitModel } from '../../src/infrastructure/models/HabitModel';
import { UserHabitModel } from '../../src/infrastructure/models/UserHabitModel';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'habits_service',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [HabitTypeModel, HabitCategoryModel, HabitModel, UserHabitModel],
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
