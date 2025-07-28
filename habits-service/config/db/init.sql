-- Create habit_categories table
CREATE TABLE IF NOT EXISTS habit_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20)
);

-- Create habits table
CREATE TABLE IF NOT EXISTS habits (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category_id INT REFERENCES habit_categories(id),
    description VARCHAR(500)
);

-- Create user_habits table
CREATE TABLE IF NOT EXISTS user_habits (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    habit_id UUID REFERENCES habits(id),
    name VARCHAR(100),
    description TEXT,
    routine_days VARCHAR(7) NOT NULL DEFAULT '1111111',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create study_sessions table
CREATE TABLE IF NOT EXISTS study_sessions (
    id UUID PRIMARY KEY,
    user_habit_id UUID REFERENCES user_habits(id),
    subject VARCHAR(100),
    topic TEXT,
    focus_level INT CHECK (focus_level BETWEEN 1 AND 10),
    notes TEXT,
    duration_minutes INT,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sleep_sessions table
CREATE TABLE IF NOT EXISTS sleep_sessions (
    id UUID PRIMARY KEY,
    user_habit_id UUID REFERENCES user_habits(id),
    sleep_time TIME NOT NULL,
    wake_up_time TIME NOT NULL,
    total_hours NUMERIC(4,2),
    sleep_quality VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create habit_duels table
CREATE TABLE IF NOT EXISTS habit_duels (
    id UUID PRIMARY KEY,
    user_habit_id UUID REFERENCES user_habits(id),
    challenger_id UUID NOT NULL,
    opponent_id UUID NOT NULL,
    streak_challenger INT NOT NULL DEFAULT 0,
    streak_opponent INT NOT NULL DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_habit_categories_name ON habit_categories(name);
CREATE INDEX IF NOT EXISTS idx_habits_name ON habits(name);
CREATE INDEX IF NOT EXISTS idx_habits_category_id ON habits(category_id);
CREATE INDEX IF NOT EXISTS idx_user_habits_user_id ON user_habits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_habits_habit_id ON user_habits(habit_id);
CREATE INDEX IF NOT EXISTS idx_user_habits_created_at ON user_habits(created_at);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_habit_id ON study_sessions(user_habit_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_created_at ON study_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_sleep_sessions_user_habit_id ON sleep_sessions(user_habit_id);
CREATE INDEX IF NOT EXISTS idx_sleep_sessions_created_at ON sleep_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_habit_duels_user_habit_id ON habit_duels(user_habit_id);
CREATE INDEX IF NOT EXISTS idx_habit_duels_challenger_id ON habit_duels(challenger_id);
CREATE INDEX IF NOT EXISTS idx_habit_duels_opponent_id ON habit_duels(opponent_id);
CREATE INDEX IF NOT EXISTS idx_habit_duels_status ON habit_duels(status);
CREATE INDEX IF NOT EXISTS idx_habit_duels_created_at ON habit_duels(created_at);

-- Comments
COMMENT ON TABLE habit_categories IS 'Categorías de hábitos';
COMMENT ON COLUMN habit_categories.name IS 'Nombre de la categoría';
COMMENT ON COLUMN habit_categories.color IS 'Color de la categoría en formato hex';

COMMENT ON TABLE habits IS 'Hábitos disponibles en el sistema';
COMMENT ON COLUMN habits.name IS 'Nombre del hábito (único)';
COMMENT ON COLUMN habits.category_id IS 'ID de la categoría del hábito';
COMMENT ON COLUMN habits.description IS 'Descripción del hábito';

COMMENT ON TABLE user_habits IS 'Hábitos personalizados de los usuarios';
COMMENT ON COLUMN user_habits.user_id IS 'ID del usuario';
COMMENT ON COLUMN user_habits.habit_id IS 'ID del hábito del sistema (opcional)';
COMMENT ON COLUMN user_habits.name IS 'Nombre del hábito';
COMMENT ON COLUMN user_habits.description IS 'Descripción del hábito';
COMMENT ON COLUMN user_habits.routine_days IS 'Días de la rutina (formato: 1010100)';
COMMENT ON COLUMN user_habits.created_at IS 'Fecha de creación del hábito';

COMMENT ON TABLE study_sessions IS 'Sesiones de estudio de los usuarios';
COMMENT ON COLUMN study_sessions.user_habit_id IS 'ID del hábito de usuario';
COMMENT ON COLUMN study_sessions.subject IS 'Materia o asignatura';
COMMENT ON COLUMN study_sessions.topic IS 'Tema específico de estudio';
COMMENT ON COLUMN study_sessions.focus_level IS 'Nivel de concentración (1-10)';
COMMENT ON COLUMN study_sessions.notes IS 'Notas adicionales de la sesión';
COMMENT ON COLUMN study_sessions.duration_minutes IS 'Duración en minutos';
COMMENT ON COLUMN study_sessions.started_at IS 'Hora de inicio de la sesión';
COMMENT ON COLUMN study_sessions.ended_at IS 'Hora de fin de la sesión';

COMMENT ON TABLE sleep_sessions IS 'Sesiones de sueño de los usuarios';
COMMENT ON COLUMN sleep_sessions.user_habit_id IS 'ID del hábito de usuario';
COMMENT ON COLUMN sleep_sessions.sleep_time IS 'Hora de dormir';
COMMENT ON COLUMN sleep_sessions.wake_up_time IS 'Hora de despertar';
COMMENT ON COLUMN sleep_sessions.total_hours IS 'Total de horas dormidas';
COMMENT ON COLUMN sleep_sessions.sleep_quality IS 'Calidad del sueño (buena, media, mala)';
COMMENT ON COLUMN sleep_sessions.notes IS 'Notas adicionales del sueño';

COMMENT ON TABLE habit_duels IS 'Duelos de hábitos entre usuarios';
COMMENT ON COLUMN habit_duels.user_habit_id IS 'ID del hábito de usuario';
COMMENT ON COLUMN habit_duels.challenger_id IS 'ID del usuario que reta';
COMMENT ON COLUMN habit_duels.opponent_id IS 'ID del usuario retado';
COMMENT ON COLUMN habit_duels.streak_challenger IS 'Racha actual del retador';
COMMENT ON COLUMN habit_duels.streak_opponent IS 'Racha actual del oponente';
COMMENT ON COLUMN habit_duels.status IS 'Estado del duelo (pending, accepted, rejected, completed, cancelled)';
COMMENT ON COLUMN habit_duels.created_at IS 'Fecha de creación del duelo';
COMMENT ON COLUMN habit_duels.completed_at IS 'Fecha de finalización del duelo';

-- Insert default data
INSERT INTO habit_categories (name, color) VALUES
('Salud', '#FF6B6B'),
('Aprendizaje', '#4ECDC4'),
('Bienestar', '#45B7D1'),
('Productividad', '#96CEB4'),
('Social', '#FFEAA7')
ON CONFLICT DO NOTHING;

INSERT INTO habits (id, name, category_id, description) VALUES
(gen_random_uuid(), 'Ejercicio', 1, 'Actividades físicas y deportivas'),
(gen_random_uuid(), 'Estudio', 2, 'Actividades de aprendizaje y educación'),
(gen_random_uuid(), 'Sueño', 3, 'Hábitos relacionados con el descanso'),
(gen_random_uuid(), 'Alimentación', 1, 'Hábitos de nutrición y alimentación'),
(gen_random_uuid(), 'Meditación', 3, 'Actividades de mindfulness y relajación'),
(gen_random_uuid(), 'Lectura', 2, 'Leer libros y artículos'),
(gen_random_uuid(), 'Hidratación', 1, 'Beber agua regularmente'),
(gen_random_uuid(), 'Organización', 4, 'Mantener espacios y tareas organizadas'),
(gen_random_uuid(), 'Socialización', 5, 'Interactuar con amigos y familia')
ON CONFLICT DO NOTHING;
