import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../config/db/database';
import { corsOptions } from '../config/cors/corsConfig';
import userRoutes from './infrastructure/http/routes/UserRoutes';
import friendshipRoutes from './infrastructure/http/routes/FriendshipRoutes';
import notificationRoutes from './infrastructure/http/routes/NotificationRoutes';
import { RabbitMQConnection } from '../config/rabbitmq/connection';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api', userRoutes);
app.use('/api', friendshipRoutes);
app.use('/api', notificationRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ 
    status: 'OK', 
    service: 'User Service',
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
    
    // Initialize UserEventService from dependencies
    const { userEventService } = await import('./infrastructure/http/dependencies/UserDependies');
    console.log('UserEventService initialized successfully');
    
    // Start server
app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
      console.log(`Health check available at http://localhost:${port}/health`);
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
