import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../config/db/database';
import { corsOptions } from '../config/cors/corsConfig';
import habitRoutes from './infrastructure/http/routes/HabitRoutes';
import habitCategoryRoutes from './infrastructure/http/routes/HabitCategoryRoutes';
import userHabitRoutes from './infrastructure/http/routes/UserHabitRoutes';
import studySessionRoutes from './infrastructure/http/routes/StudySessionRoutes';
import sleepSessionRoutes from './infrastructure/http/routes/SleepSessionRoutes';
import habitDuelRoutes from './infrastructure/http/routes/HabitDuelRoutes';

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes - Specific routes first, then parameterized routes
app.use('/api/habits', habitRoutes);
app.use('/api/habits', habitCategoryRoutes);
app.use('/api/habits', userHabitRoutes);
app.use('/api/habits', studySessionRoutes);
app.use('/api/habits', sleepSessionRoutes);
app.use('/api/habits', habitDuelRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({
    success: true,
    message: 'Habits Service is running',
    timestamp: new Date().toISOString()
  });
});

// Initialize application
async function initializeApp() {
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');

    app.listen(port, () => {
      console.log(`Habits Service listening at http://localhost:${port}`);
      console.log(`Health check available at http://localhost:${port}/health`);
      console.log(`📋 Habit endpoints: http://localhost:${port}/api/habits/habits`);
      console.log(`📂 Category endpoints: http://localhost:${port}/api/habits/habit-categories`);
      console.log(`👤 User habit endpoints: http://localhost:${port}/api/habits/user-habits`);
      console.log(`📚 Study session endpoints: http://localhost:${port}/api/habits/study-sessions`);
      console.log(`💤 Sleep session endpoints: http://localhost:${port}/api/habits/sleep-sessions`);
      console.log(`⚔️ Habit duel endpoints: http://localhost:${port}/api/habits/habit-duels`);
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
