import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../config/db/database';
import { corsOptions } from '../config/cors/corsConfig';
import postRoutes from './infrastructure/http/routes/PostRoutes';
import commentRoutes from './infrastructure/http/routes/CommentRoutes';
import reactionRoutes from './infrastructure/http/routes/ReactionRoutes';

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/community', postRoutes);
app.use('/api/community', commentRoutes);
app.use('/api/community', reactionRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Community Service',
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
      console.log(`Community Service listening at http://localhost:${port}`);
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
