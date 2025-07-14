import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import amqp from 'amqplib';
import { initializeDatabase } from './config/db/database';
import { corsOptions } from './config/cors/corsConfig';
import userRoutes from './infrastructure/http/routes/UserRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api', userRoutes);

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
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672');
    const channel = await connection.createChannel();
    
    // Declare exchange for user events
    await channel.assertExchange('user_events', 'topic', { durable: true });
    
    console.log('RabbitMQ connected successfully');
    
    // Handle connection errors
    connection.on('error', (error) => {
      console.error('RabbitMQ connection error:', error);
    });
    
    connection.on('close', () => {
      console.log('RabbitMQ connection closed');
    });
    
    return { connection, channel };
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
    await userEventService.initialize();
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
