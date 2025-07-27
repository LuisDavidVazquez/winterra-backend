import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../config/db/database';
import { corsOptions } from '../config/cors/corsConfig';
import avatarRoutes from './infrastructure/http/routes/AvatarRoutes';
import accessoryRoutes from './infrastructure/http/routes/AccessoryRoutes';
import achievementRoutes from './infrastructure/http/routes/AchievementRoutes';
import encouragementNoteRoutes from './infrastructure/http/routes/EncouragementNoteRoutes';
import { RabbitMQConnection } from '../config/rabbitmq/connection';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes - Specific routes first, then parameterized routes
app.use('/api/avatars', accessoryRoutes);
app.use('/api/avatars', achievementRoutes);
app.use('/api/avatars', encouragementNoteRoutes);
app.use('/api/avatars', avatarRoutes);

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
    
    // Start server
    app.listen(port, () => {
      console.log(`Avatar Service listening at http://localhost:${port}`);
      console.log(`Health check available at http://localhost:${port}/health`);
      console.log(`🎮 Avatar endpoints: http://localhost:${port}/api/avatars`);
      console.log(`🎨 Accessory endpoints: http://localhost:${port}/api/avatars/accessories`);
      console.log(`🏆 Achievement endpoints: http://localhost:${port}/api/avatars/achievements`);
      console.log(`💌 Encouragement note endpoints: http://localhost:${port}/api/avatars/encouragement-notes`);
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
