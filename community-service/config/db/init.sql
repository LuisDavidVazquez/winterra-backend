-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    content VARCHAR(1000) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    content VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Create reactions table
CREATE TABLE IF NOT EXISTS reactions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    reacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    
    -- Constraints
    CONSTRAINT reactions_user_post_unique UNIQUE (user_id, post_id)
);

-- Indexes for posts
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_image_url ON posts(image_url) WHERE image_url IS NOT NULL;

-- Indexes for comments
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);

-- Indexes for reactions
CREATE INDEX IF NOT EXISTS idx_reactions_post_id ON reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_reactions_reacted_at ON reactions(reacted_at);

-- Comments
COMMENT ON TABLE posts IS 'Tabla principal de posts de la comunidad';
COMMENT ON COLUMN posts.user_id IS 'ID del usuario que creó el post';
COMMENT ON COLUMN posts.content IS 'Contenido del post (máximo 1000 caracteres)';
COMMENT ON COLUMN posts.image_url IS 'URL de la imagen del post (opcional)';
COMMENT ON COLUMN posts.created_at IS 'Fecha y hora de creación del post';

COMMENT ON TABLE comments IS 'Tabla de comentarios en posts';
COMMENT ON COLUMN comments.user_id IS 'ID del usuario que hizo el comentario';
COMMENT ON COLUMN comments.post_id IS 'ID del post al que pertenece el comentario';
COMMENT ON COLUMN comments.content IS 'Contenido del comentario (máximo 500 caracteres)';
COMMENT ON COLUMN comments.created_at IS 'Fecha y hora de creación del comentario';

COMMENT ON TABLE reactions IS 'Tabla de reacciones (likes) en posts';
COMMENT ON COLUMN reactions.user_id IS 'ID del usuario que reaccionó';
COMMENT ON COLUMN reactions.post_id IS 'ID del post al que reaccionó';
COMMENT ON COLUMN reactions.reacted_at IS 'Fecha y hora de la reacción';
COMMENT ON CONSTRAINT reactions_user_post_unique ON reactions IS 'Un usuario solo puede reaccionar una vez por post';
