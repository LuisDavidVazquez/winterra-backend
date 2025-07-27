import { DataSource } from 'typeorm';
import { MissionModel } from '../../src/infrastructure/models/MissionModel';
import { UserMissionModel } from '../../src/infrastructure/models/UserMissionModel';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === 'development',
  ssl: {
    rejectUnauthorized: false,
  },
  logging: process.env.NODE_ENV === 'development',
  entities: [MissionModel, UserMissionModel],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};
