-- Create database
CREATE DATABASE IF NOT EXISTS anidox;
USE anidox;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Anime series table
CREATE TABLE IF NOT EXISTS anime_series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image VARCHAR(255),
    release_year INT,
    status ENUM('ongoing', 'completed', 'upcoming') DEFAULT 'ongoing',
    rating DECIMAL(3, 2),
    total_episodes INT,
    genres VARCHAR(255),
    studio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Episodes table
CREATE TABLE IF NOT EXISTS episodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anime_id INT NOT NULL,
    episode_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(255),
    thumbnail_url VARCHAR(255),
    duration INT,
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (anime_id) REFERENCES anime_series(id) ON DELETE CASCADE
);

-- Watch history table
CREATE TABLE watch_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    episode_id INT,
    watched_duration INT,
    last_watched TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (episode_id) REFERENCES episodes(id)
);

-- Favorites table
CREATE TABLE favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    anime_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (anime_id) REFERENCES anime_series(id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    episode_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (episode_id) REFERENCES episodes(id) ON DELETE CASCADE
);

-- Ratings table
CREATE TABLE ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    anime_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (anime_id) REFERENCES anime_series(id)
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@anidox.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert default settings
INSERT INTO settings (name, value) VALUES
('site_title', 'AniDox - Anime Streaming'),
('site_description', 'Watch your favorite anime series and movies in HD quality'),
('contact_email', 'contact@anidox.com'),
('maintenance_mode', '0');

-- Add One Piece to anime_series table
INSERT INTO anime_series (
    title, 
    description, 
    total_episodes,
    available_episodes,
    status
) VALUES (
    'One Piece',
    'Follow Monkey D. Luffy and his pirate crew in their epic adventure across the Grand Line.',
    1122,
    160,
    'ongoing'
);

-- Add episodes to episodes table
INSERT INTO episodes (
    anime_id,
    episode_number,
    title,
    video_url,
    duration
) VALUES 
(1, 1, 'Romance Dawn', 'D:/anime/One Piece/One Piece E01.mp4', 24),
(1, 2, 'Enter the Great Swordsman! Pirate Hunter Roronoa Zoro', 'D:/anime/One Piece/One Piece E02.mp4', 24),
(1, 3, 'Morgan vs. Luffy! Who\'s the Mysterious Pretty Girl?', 'D:/anime/One Piece/One Piece E03.mp4', 24),
(1, 4, 'Luffy\'s Past! Enter Red-Haired Shanks!', 'D:/anime/One Piece/One Piece E04.mp4', 24),
(1, 5, 'Fear, Mysterious Power! Pirate Clown Captain Buggy!', 'D:/anime/One Piece/One Piece E05.mp4', 24);