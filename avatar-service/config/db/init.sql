-- Create avatars table
CREATE TABLE IF NOT EXISTS avatars (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    experience INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    coins INTEGER NOT NULL DEFAULT 100,
    streak_days INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create accessories table
CREATE TABLE IF NOT EXISTS accessories (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type INTEGER NOT NULL CHECK (type IN (1, 2, 3, 4)), -- 1: Cabeza, 2: Pecho, 3: Pantalón, 4: Zapatos
    price INTEGER NOT NULL DEFAULT 0,
    rarity INTEGER NOT NULL CHECK (rarity IN (1, 2, 3)), -- 1: Especial, 2: Épico, 3: Legendario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT accessories_price_non_negative CHECK (price >= 0)
);

-- Create avatar_accessories table
CREATE TABLE IF NOT EXISTS avatar_accessories (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    accessory_id UUID NOT NULL,
    is_equipped BOOLEAN NOT NULL DEFAULT FALSE,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (user_id) REFERENCES avatars(user_id) ON DELETE CASCADE,
    FOREIGN KEY (accessory_id) REFERENCES accessories(id) ON DELETE CASCADE,
    
    -- Constraints
    CONSTRAINT avatar_accessories_user_accessory_unique UNIQUE (user_id, accessory_id)
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    img VARCHAR(500), -- URL de la imagen (puede ser NULL)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create avatar_achievements table
CREATE TABLE IF NOT EXISTS avatar_achievements (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    achievement_id UUID NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (user_id) REFERENCES avatars(user_id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    
    -- Constraints
    CONSTRAINT avatar_achievements_user_achievement_unique UNIQUE (user_id, achievement_id)
);

-- Create encouragement_notes table
CREATE TABLE IF NOT EXISTS encouragement_notes (
    id UUID PRIMARY KEY,
    avatar_id UUID NOT NULL,
    content VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (avatar_id) REFERENCES avatars(id) ON DELETE CASCADE
);

-- Indexes for avatars
CREATE INDEX IF NOT EXISTS idx_avatars_user_id ON avatars(user_id);
CREATE INDEX IF NOT EXISTS idx_avatars_created_at ON avatars(created_at);

-- Accessory indexes
CREATE INDEX IF NOT EXISTS idx_accessories_type ON accessories(type);
CREATE INDEX IF NOT EXISTS idx_accessories_rarity ON accessories(rarity);
CREATE INDEX IF NOT EXISTS idx_accessories_price ON accessories(price);

-- Avatar accessory indexes
CREATE INDEX IF NOT EXISTS idx_avatar_accessories_user_id ON avatar_accessories(user_id);
CREATE INDEX IF NOT EXISTS idx_avatar_accessories_accessory_id ON avatar_accessories(accessory_id);
CREATE INDEX IF NOT EXISTS idx_avatar_accessories_is_equipped ON avatar_accessories(is_equipped);
CREATE INDEX IF NOT EXISTS idx_avatar_accessories_unlocked_at ON avatar_accessories(unlocked_at);

-- Achievement indexes
CREATE INDEX IF NOT EXISTS idx_achievements_name ON achievements(name);
CREATE INDEX IF NOT EXISTS idx_achievements_created_at ON achievements(created_at);

-- Avatar achievement indexes
CREATE INDEX IF NOT EXISTS idx_avatar_achievements_user_id ON avatar_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_avatar_achievements_achievement_id ON avatar_achievements(achievement_id);
CREATE INDEX IF NOT EXISTS idx_avatar_achievements_unlocked_at ON avatar_achievements(unlocked_at);

-- Encouragement note indexes
CREATE INDEX IF NOT EXISTS idx_encouragement_notes_avatar_id ON encouragement_notes(avatar_id);
CREATE INDEX IF NOT EXISTS idx_encouragement_notes_created_at ON encouragement_notes(created_at);

-- Comments
COMMENT ON TABLE avatars IS 'Tabla principal de avatares de usuarios';
COMMENT ON COLUMN avatars.user_id IS 'ID único del usuario (referencia a user-service)';
COMMENT ON COLUMN avatars.experience IS 'Experiencia actual del avatar';
COMMENT ON COLUMN avatars.level IS 'Nivel actual del avatar';
COMMENT ON COLUMN avatars.coins IS 'Monedas disponibles del avatar';
COMMENT ON COLUMN avatars.streak_days IS 'Días consecutivos de actividad';

COMMENT ON TABLE accessories IS 'Tabla de accesorios disponibles';
COMMENT ON COLUMN accessories.type IS 'Tipo de accesorio: 1=Cabeza, 2=Pecho, 3=Pantalón, 4=Zapatos';
COMMENT ON COLUMN accessories.rarity IS 'Rareza: 1=Especial, 2=Épico, 3=Legendario';
COMMENT ON COLUMN accessories.price IS 'Precio en monedas del accesorio';

COMMENT ON TABLE avatar_accessories IS 'Relación entre avatares y accesorios desbloqueados';
COMMENT ON COLUMN avatar_accessories.is_equipped IS 'Indica si el accesorio está equipado actualmente';

COMMENT ON TABLE achievements IS 'Tabla de logros disponibles';
COMMENT ON COLUMN achievements.name IS 'Nombre del logro';
COMMENT ON COLUMN achievements.description IS 'Descripción del logro';
COMMENT ON COLUMN achievements.img IS 'URL de la imagen del logro (opcional)';

COMMENT ON TABLE avatar_achievements IS 'Relación entre avatares y logros desbloqueados';
COMMENT ON COLUMN avatar_achievements.unlocked_at IS 'Fecha y hora cuando se desbloqueó el logro';

COMMENT ON TABLE encouragement_notes IS 'Tabla de notas de ánimo para avatares';
COMMENT ON COLUMN encouragement_notes.avatar_id IS 'ID del avatar al que pertenece la nota';
COMMENT ON COLUMN encouragement_notes.content IS 'Contenido de la nota de ánimo (máximo 1000 caracteres)';
COMMENT ON COLUMN encouragement_notes.created_at IS 'Fecha y hora de creación de la nota';
