import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../config/db/database';
import { corsOptions } from '../config/cors/corsConfig';
import habitTypeRoutes from './infrastructure/http/routes/HabitTypeRoutes';
import userHabitRoutes from './infrastructure/http/routes/UserHabitRoutes';

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes - Specific routes first, then parameterized routes
app.use('/api/habits', habitTypeRoutes);
app.use('/api/habits', userHabitRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Habits Service',
    timestamp: new Date().toISOString()
  });
});

// Initialize application
async function initializeApp() {
  try {
    // Initialize database
    await initializeDatabase();
    console.log('Database initialized successfully');
    
    // Start server
    app.listen(port, () => {
      console.log(`Habits Service listening at http://localhost:${port}`);
      console.log(`Health check available at http://localhost:${port}/health`);
      console.log(`🏃 Habit type endpoints: http://localhost:${port}/api/habits/habit-types`);
      console.log(`👤 User habit endpoints: http://localhost:${port}/api/habits/{userId}/habits`);
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
