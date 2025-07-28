-- Create missions table
CREATE TABLE IF NOT EXISTS missions (
    habit_id INT NOT NULL,
    id UUID PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
    exp_reward INT NOT NULL,
    coin_reward INT NOT NULL,
    objective INT NOT NULL,
    created_by_system BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_missions table
CREATE TABLE IF NOT EXISTS user_missions (
    id UUID PRIMARY KEY,
    user_habits_id UUID NOT NULL,
    mission_id UUID NOT NULL,
    status VARCHAR(20) CHECK (status IN ('in_progress', 'completed')),
    progress INT NOT NULL DEFAULT 0,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
);

-- Indexes for missions
CREATE INDEX IF NOT EXISTS idx_missions_habit_id ON missions(habit_id);
CREATE INDEX IF NOT EXISTS idx_missions_difficulty_level ON missions(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_missions_created_by_system ON missions(created_by_system);
CREATE INDEX IF NOT EXISTS idx_missions_created_at ON missions(created_at);

-- Indexes for user_missions
CREATE INDEX IF NOT EXISTS idx_user_missions_user_habits_id ON user_missions(user_habits_id);
CREATE INDEX IF NOT EXISTS idx_user_missions_mission_id ON user_missions(mission_id);
CREATE INDEX IF NOT EXISTS idx_user_missions_status ON user_missions(status);
CREATE INDEX IF NOT EXISTS idx_user_missions_assigned_at ON user_missions(assigned_at);
CREATE INDEX IF NOT EXISTS idx_user_missions_completed_at ON user_missions(completed_at);

-- Comments
COMMENT ON TABLE missions IS 'Tabla de misiones disponibles en el sistema';
COMMENT ON COLUMN missions.habit_id IS 'ID del hábito al que pertenece la misión';
COMMENT ON COLUMN missions.id IS 'ID único de la misión';
COMMENT ON COLUMN missions.title IS 'Título de la misión (máximo 100 caracteres)';
COMMENT ON COLUMN missions.description IS 'Descripción detallada de la misión';
COMMENT ON COLUMN missions.difficulty_level IS 'Nivel de dificultad: easy, medium, hard';
COMMENT ON COLUMN missions.exp_reward IS 'Recompensa de experiencia al completar la misión';
COMMENT ON COLUMN missions.coin_reward IS 'Recompensa de monedas al completar la misión';
COMMENT ON COLUMN missions.objective IS 'Objetivo total de la misión';
COMMENT ON COLUMN missions.created_by_system IS 'Indica si la misión fue creada por el sistema';
COMMENT ON COLUMN missions.created_at IS 'Fecha y hora de creación de la misión';

COMMENT ON TABLE user_missions IS 'Tabla de misiones asignadas a usuarios';
COMMENT ON COLUMN user_missions.id IS 'ID único de la asignación de misión';
COMMENT ON COLUMN user_missions.user_habits_id IS 'ID del hábito del usuario';
COMMENT ON COLUMN user_missions.mission_id IS 'ID de la misión asignada';
COMMENT ON COLUMN user_missions.status IS 'Estado de la misión: in_progress, completed';
COMMENT ON COLUMN user_missions.progress IS 'Progreso actual de la misión';
COMMENT ON COLUMN user_missions.assigned_at IS 'Fecha y hora de asignación de la misión';
COMMENT ON COLUMN user_missions.completed_at IS 'Fecha y hora de completado de la misión';

-- Insert default missions for different habits
INSERT INTO missions (id, habit_id, title, description, difficulty_level, exp_reward, coin_reward, objective, created_by_system) VALUES
-- Exercise missions
(gen_random_uuid(), 1, 'Complete 5 workouts', 'Complete 5 workout sessions this week to build strength and endurance', 'medium', 100, 50, 5, true),
(gen_random_uuid(), 1, 'Run 10km', 'Complete a 10km run to improve cardiovascular health', 'hard', 200, 100, 10, true),
(gen_random_uuid(), 1, 'Do 50 push-ups', 'Complete 50 push-ups in a single session', 'easy', 50, 25, 50, true),

-- Study missions
(gen_random_uuid(), 2, 'Study for 2 hours', 'Dedicate 2 hours to focused study sessions', 'medium', 150, 75, 2, true),
(gen_random_uuid(), 2, 'Complete 3 chapters', 'Read and understand 3 chapters of your study material', 'hard', 250, 125, 3, true),
(gen_random_uuid(), 2, 'Take study notes', 'Create comprehensive notes for your current topic', 'easy', 75, 40, 1, true),

-- Sleep missions
(gen_random_uuid(), 3, 'Sleep 8 hours', 'Get a full 8 hours of quality sleep', 'medium', 120, 60, 8, true),
(gen_random_uuid(), 3, 'Maintain sleep schedule', 'Go to bed and wake up at the same time for 7 days', 'hard', 300, 150, 7, true),
(gen_random_uuid(), 3, 'No screens before bed', 'Avoid screens 1 hour before bedtime', 'easy', 60, 30, 1, true),

-- Nutrition missions
(gen_random_uuid(), 4, 'Eat 3 balanced meals', 'Have 3 well-balanced meals today', 'easy', 80, 40, 3, true),
(gen_random_uuid(), 4, 'Drink 8 glasses of water', 'Stay hydrated by drinking 8 glasses of water', 'medium', 100, 50, 8, true),
(gen_random_uuid(), 4, 'Avoid junk food', 'Skip processed and junk food for a week', 'hard', 200, 100, 7, true),

-- Meditation missions
(gen_random_uuid(), 5, 'Meditate for 10 minutes', 'Practice mindfulness meditation for 10 minutes', 'easy', 60, 30, 10, true),
(gen_random_uuid(), 5, 'Meditate for 30 minutes', 'Complete a 30-minute meditation session', 'medium', 150, 75, 30, true),
(gen_random_uuid(), 5, 'Daily meditation streak', 'Meditate every day for 7 consecutive days', 'hard', 350, 175, 7, true),

-- Reading missions
(gen_random_uuid(), 6, 'Read for 30 minutes', 'Read a book or article for 30 minutes', 'easy', 70, 35, 30, true),
(gen_random_uuid(), 6, 'Read 100 pages', 'Read 100 pages of any book', 'medium', 180, 90, 100, true),
(gen_random_uuid(), 6, 'Finish a book', 'Complete reading an entire book', 'hard', 400, 200, 1, true),

-- Hydration missions
(gen_random_uuid(), 7, 'Drink 6 glasses of water', 'Stay hydrated by drinking 6 glasses of water', 'easy', 50, 25, 6, true),
(gen_random_uuid(), 7, 'Drink 10 glasses of water', 'Maintain excellent hydration with 10 glasses', 'medium', 120, 60, 10, true),
(gen_random_uuid(), 7, 'Perfect hydration week', 'Drink 8+ glasses of water every day for a week', 'hard', 250, 125, 7, true),

-- Organization missions
(gen_random_uuid(), 8, 'Organize your desk', 'Clean and organize your workspace', 'easy', 60, 30, 1, true),
(gen_random_uuid(), 8, 'Create a to-do list', 'Plan your day with a detailed to-do list', 'medium', 80, 40, 1, true),
(gen_random_uuid(), 8, 'Declutter your room', 'Remove unnecessary items and organize your space', 'hard', 200, 100, 1, true),

-- Socialization missions
(gen_random_uuid(), 9, 'Call a friend', 'Reach out to a friend or family member', 'easy', 50, 25, 1, true),
(gen_random_uuid(), 9, 'Meet with friends', 'Spend quality time with friends or family', 'medium', 120, 60, 1, true),
(gen_random_uuid(), 9, 'Join a social activity', 'Participate in a group activity or event', 'hard', 200, 100, 1, true)
ON CONFLICT DO NOTHING;
