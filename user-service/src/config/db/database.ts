import { DataSource } from 'typeorm';
import { UserModel } from '../../infrastructure/models/UserModel';
import { PlanModel } from '../../infrastructure/models/PlanModel';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'user_service',
  password: process.env.DB_PASSWORD || 'user_service_pass',
  database: process.env.DB_DATABASE || 'user_service_db',
  synchronize: false, // Desactivado para usar migraciones
  logging: process.env.NODE_ENV === 'development',
  entities: [UserModel, PlanModel],
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