import { DataSource } from 'typeorm';
import { UserModel } from '../../src/infrastructure/models/UserModel';
import { PlanModel } from '../../src/infrastructure/models/PlanModel';
import { FriendshipModel } from '../../src/infrastructure/models/FriendshipModel';
import { NotificationModel } from '../../src/infrastructure/models/NotificationModel';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [UserModel, PlanModel, FriendshipModel, NotificationModel],
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
