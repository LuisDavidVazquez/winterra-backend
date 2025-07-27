import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../config/db/database';
import { corsOptions } from '../config/cors/corsConfig';
import missionRoutes from './infrastructure/http/routes/MissionRoutes';
import userMissionRoutes from './infrastructure/http/routes/UserMissionRoutes';

const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/missions', missionRoutes);
app.use('/api/missions', userMissionRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Rewards Service',
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
      console.log(`Rewards Service listening at http://localhost:${port}`);
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