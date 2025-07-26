-- Create avatars table
CREATE TABLE IF NOT EXISTS avatars (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    experience INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    coins INTEGER NOT NULL DEFAULT 0,
    streak_days INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT avatars_experience_non_negative CHECK (experience >= 0),
    CONSTRAINT avatars_level_positive CHECK (level > 0),
    CONSTRAINT avatars_coins_non_negative CHECK (coins >= 0),
    CONSTRAINT avatars_streak_days_non_negative CHECK (streak_days >= 0),
    CONSTRAINT avatars_user_id_unique UNIQUE (user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_avatars_user_id ON avatars(user_id);
CREATE INDEX IF NOT EXISTS idx_avatars_created_at ON avatars(created_at);

-- Add comments
COMMENT ON TABLE avatars IS 'Stores user avatar information including experience, level, coins, and streak';
COMMENT ON COLUMN avatars.id IS 'Unique identifier for the avatar';
COMMENT ON COLUMN avatars.user_id IS 'Reference to the user who owns this avatar';
COMMENT ON COLUMN avatars.experience IS 'Total experience points accumulated by the user';
COMMENT ON COLUMN avatars.level IS 'Current level of the user based on experience';
COMMENT ON COLUMN avatars.coins IS 'Virtual currency available to the user';
COMMENT ON COLUMN avatars.streak_days IS 'Number of consecutive days the user has been active';
COMMENT ON COLUMN avatars.created_at IS 'Timestamp when the avatar was created';
COMMENT ON COLUMN avatars.updated_at IS 'Timestamp when the avatar was last updated';
