CREATE DATABASE IF NOT EXISTS curaveris_healthcare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE curaveris_healthcare;
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.5,
  stock INT NOT NULL DEFAULT 0,
  image VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS auth_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(40) NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products (name, category, price, rating, stock, image, description) VALUES
('Strip-by-Strip QR Authentication', 'Product Traceability', 0, 4.9, 120, 'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=900', 'Unique strip-level QR verification for authentic, transparent, and instantly checkable medicines.'),
('GPS Field Force Tracking', 'Field Operations', 0, 4.8, 85, 'https://images.pexels.com/photos/7709287/pexels-photo-7709287.jpeg?auto=compress&cs=tinysrgb&w=900', 'GPS-enabled reporting that keeps pharma outreach precise, time-bound, and accountable.'),
('Advanced Pharma Software', 'Digital Infrastructure', 0, 4.9, 64, 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=900', 'Smart software workflows for transparent pharmaceutical marketing and operational visibility.'),
('Real-Time Reporting System', 'Analytics', 0, 4.7, 56, 'https://images.unsplash.com/photo-1581093458791-9d42cc030d21?auto=format&fit=crop&w=900&q=80', 'Live reporting tools for tracking reach, performance, clinic activity, and field execution.');

