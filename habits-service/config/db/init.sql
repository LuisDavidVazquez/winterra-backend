-- Create habit_types table
CREATE TABLE IF NOT EXISTS habit_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Create habit_categories table
CREATE TABLE IF NOT EXISTS habit_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20)
);

-- Create habits table
CREATE TABLE IF NOT EXISTS habits (
    id UUID PRIMARY KEY,
    habit_type INT REFERENCES habit_types(id),
    habit_category INT REFERENCES habit_categories(id),
    description TEXT
);

-- Create user_habits table
CREATE TABLE IF NOT EXISTS user_habits (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    habit_id UUID REFERENCES habits(id),
    custom_name VARCHAR(100),
    custom_description TEXT,
    routine_days VARCHAR(7) NOT NULL DEFAULT '1111111',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_habit_types_name ON habit_types(name);
CREATE INDEX IF NOT EXISTS idx_habit_categories_name ON habit_categories(name);
CREATE INDEX IF NOT EXISTS idx_habits_type ON habits(habit_type);
CREATE INDEX IF NOT EXISTS idx_habits_category ON habits(habit_category);
CREATE INDEX IF NOT EXISTS idx_user_habits_user_id ON user_habits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_habits_habit_id ON user_habits(habit_id);
CREATE INDEX IF NOT EXISTS idx_user_habits_created_at ON user_habits(created_at);

-- Comments
COMMENT ON TABLE habit_types IS 'Tipos de hábito disponibles en el sistema';
COMMENT ON COLUMN habit_types.name IS 'Nombre del tipo de hábito';
COMMENT ON COLUMN habit_types.description IS 'Descripción del tipo de hábito';

COMMENT ON TABLE habit_categories IS 'Categorías de hábitos';
COMMENT ON COLUMN habit_categories.name IS 'Nombre de la categoría';
COMMENT ON COLUMN habit_categories.color IS 'Color de la categoría en formato hex';

COMMENT ON TABLE habits IS 'Hábitos disponibles en el sistema';
COMMENT ON COLUMN habits.habit_type IS 'ID del tipo de hábito';
COMMENT ON COLUMN habits.habit_category IS 'ID de la categoría del hábito';
COMMENT ON COLUMN habits.description IS 'Descripción del hábito';

COMMENT ON TABLE user_habits IS 'Hábitos personalizados de los usuarios';
COMMENT ON COLUMN user_habits.user_id IS 'ID del usuario';
COMMENT ON COLUMN user_habits.habit_id IS 'ID del hábito del sistema (opcional)';
COMMENT ON COLUMN user_habits.custom_name IS 'Nombre personalizado del hábito';
COMMENT ON COLUMN user_habits.custom_description IS 'Descripción personalizada del hábito';
COMMENT ON COLUMN user_habits.routine_days IS 'Días de la rutina (formato: 1010100)';
COMMENT ON COLUMN user_habits.created_at IS 'Fecha de creación del hábito';

-- Insert default data
INSERT INTO habit_types (name, description) VALUES
('Ejercicio', 'Actividades físicas y deportivas'),
('Estudio', 'Actividades de aprendizaje y educación'),
('Sueño', 'Hábitos relacionados con el descanso'),
('Alimentación', 'Hábitos de nutrición y alimentación'),
('Meditación', 'Actividades de mindfulness y relajación')
ON CONFLICT DO NOTHING;

INSERT INTO habit_categories (name, color) VALUES
('Salud', '#FF6B6B'),
('Aprendizaje', '#4ECDC4'),
('Bienestar', '#45B7D1'),
('Productividad', '#96CEB4'),
('Social', '#FFEAA7')
ON CONFLICT DO NOTHING;
