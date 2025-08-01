import { DataSource } from 'typeorm';
import { AvatarModel } from '../../src/infrastructure/models/AvatarModel';
import { AccessoryModel } from '../../src/infrastructure/models/AccessoryModel';
import { AvatarAccessoryModel } from '../../src/infrastructure/models/AvatarAccessoryModel';
import { AchievementModel } from '../../src/infrastructure/models/AchievementModel';
import { AvatarAchievementModel } from '../../src/infrastructure/models/AvatarAchievementModel';
import { EncouragementNoteModel } from '../../src/infrastructure/models/EncouragementNoteModel';

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
  entities: [AvatarModel, AccessoryModel, AvatarAccessoryModel, AchievementModel, AvatarAchievementModel, EncouragementNoteModel],
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
