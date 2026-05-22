CREATE DATABASE IF NOT EXISTS gl_healthcare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gl_healthcare;
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
('Restorative Composite Kit', 'Restoratives', 2450, 4.8, 42, 'https://images.pexels.com/photos/5355919/pexels-photo-5355919.jpeg?auto=compress&cs=tinysrgb&w=900', 'Light-cure composite shades for daily chairside restorative work.'),
('Dental Impression Material', 'Impression', 1850, 4.7, 36, 'https://images.pexels.com/photos/4687153/pexels-photo-4687153.jpeg?auto=compress&cs=tinysrgb&w=900', 'Reliable impression material for crown, bridge, and prosthetic cases.'),
('Sterilization Pouches Pack', 'Infection Control', 780, 4.9, 120, 'https://images.pexels.com/photos/7800526/pexels-photo-7800526.jpeg?auto=compress&cs=tinysrgb&w=900', 'Self-sealing pouches for instrument sterilization and clinic safety.'),
('Bonding Agent System', 'Adhesives', 1320, 4.6, 55, 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=900&q=80', 'High-strength adhesive system for predictable bonding performance.');
