import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../config/db/database';
import { corsOptions } from '../config/cors/corsConfig';
import avatarRoutes from './infrastructure/http/routes/AvatarRoutes';
import { createAccessoryRoutes } from './infrastructure/http/routes/AccessoryRoutes';
import { createAchievementRoutes } from './infrastructure/http/routes/AchievementRoutes';
import { createEncouragementNoteRoutes } from './infrastructure/http/routes/EncouragementNoteRoutes';
import { RabbitMQConnection } from '../config/rabbitmq/connection';
import {
  createAvatarController,
  getAvatarController,
  getAllAvatarsController,
  addExperienceController,
  addCoinsController,
  spendCoinsController,
  createAccessoryController,
  getAllAccessoriesController,
  purchaseAccessoryController,
  equipAccessoryController,
  getUserAccessoriesController,
  createAchievementController,
  getAllAchievementsController,
  unlockAchievementController,
  getUserAchievementsController
} from './infrastructure/http/dependencies/AvatarDependencies';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api', avatarRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Avatar Service',
    timestamp: new Date().toISOString()
  });
});

// RabbitMQ connection and event handling
async function setupRabbitMQ() {
  try {
    const rabbitMQ = RabbitMQConnection.getInstance();
    await rabbitMQ.connect();
    console.log('RabbitMQ connected successfully');
    return rabbitMQ;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    return null;
  }
}

// Initialize application
async function initializeApp() {
  try {
    // Initialize database
    await initializeDatabase();
    console.log('Database initialized successfully');
    
    // Setup RabbitMQ
    await setupRabbitMQ();
    
    // Initialize AvatarEventService from dependencies
    const { avatarEventService } = await import('./infrastructure/http/dependencies/AvatarDependencies');
    console.log('AvatarEventService initialized successfully');
    
    // Setup accessory routes
    const { 
      createAccessoryController,
      getAllAccessoriesController,
      purchaseAccessoryController,
      equipAccessoryController,
      getUserAccessoriesController
    } = await import('./infrastructure/http/dependencies/AvatarDependencies');

    const accessoryRoutes = createAccessoryRoutes(
      createAccessoryController,
      getAllAccessoriesController,
      purchaseAccessoryController,
      equipAccessoryController,
      getUserAccessoriesController
    );

    app.use('/api', accessoryRoutes);

    // Setup achievement routes
    const {
      createAchievementController,
      getAllAchievementsController,
      unlockAchievementController,
      getUserAchievementsController
    } = await import('./infrastructure/http/dependencies/AvatarDependencies');

    const achievementRoutes = createAchievementRoutes(
      createAchievementController,
      getAllAchievementsController,
      unlockAchievementController,
      getUserAchievementsController
    );

    app.use('/api', achievementRoutes);

    // Setup encouragement note routes
    const {
      createEncouragementNoteController,
      getAvatarEncouragementNotesController,
      getAllEncouragementNotesController
    } = await import('./infrastructure/http/dependencies/AvatarDependencies');

    const encouragementNoteRoutes = createEncouragementNoteRoutes(
      createEncouragementNoteController,
      getAvatarEncouragementNotesController,
      getAllEncouragementNotesController
    );

    app.use('/api', encouragementNoteRoutes);
    
    // Start server
    app.listen(port, () => {
      console.log(`Avatar Service listening at http://localhost:${port}`);
      console.log(`Health check available at http://localhost:${port}/health`);
      console.log(`🎮 Avatar endpoints: http://localhost:${port}/api/avatars`);
      console.log(`🎨 Accessory endpoints: http://localhost:${port}/api/accessories`);
      console.log(`🏆 Achievement endpoints: http://localhost:${port}/api/achievements`);
      console.log(`💌 Encouragement note endpoints: http://localhost:${port}/api/encouragement-notes`);
    });
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the application
initializeApp();
