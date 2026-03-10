-- ═══════════════════════════════════════════════════════════
--  dripbite.sql  —  Full database schema for The Drip Bite
--  Import this in phpMyAdmin: select `dripbite` DB → Import tab
-- ═══════════════════════════════════════════════════════════

SET NAMES utf8mb4;
SET time_zone = '+08:00';

-- ── USERS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `users` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `username`   VARCHAR(50)  NOT NULL UNIQUE,
    `email`      VARCHAR(120) NOT NULL UNIQUE,
    `phone`      VARCHAR(20)  DEFAULT NULL,
    `password`   VARCHAR(255) NOT NULL,   -- stored as plain text (matches original logic)
    `created_at` TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── CART ITEMS (per user, one active cart) ─────────────────────
CREATE TABLE IF NOT EXISTS `cart` (
    `id`           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id`      INT UNSIGNED NOT NULL,
    `name`         VARCHAR(100) NOT NULL,
    `price`        DECIMAL(10,2) NOT NULL,
    `quantity`     INT UNSIGNED NOT NULL DEFAULT 1,
    `instructions` TEXT DEFAULT NULL,
    `added_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── ORDERS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `orders` (
    `id`                 INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id`            INT UNSIGNED NOT NULL,
    `order_code`         VARCHAR(60)  NOT NULL UNIQUE,
    `total`              DECIMAL(10,2) NOT NULL,
    `payment_method`     VARCHAR(60)  NOT NULL,
    `delivery_type`      ENUM('standard','priority','scheduled') DEFAULT 'standard',
    `scheduled_datetime` DATETIME     DEFAULT NULL,
    `address_label`      VARCHAR(100) DEFAULT NULL,
    `address_street`     VARCHAR(200) DEFAULT NULL,
    `address_city`       VARCHAR(100) DEFAULT NULL,
    `delivery_note`      TEXT         DEFAULT NULL,
    `status`             ENUM('active','delivered','cancelled') DEFAULT 'active',
    `start_time`         BIGINT       NOT NULL,   -- JS timestamp (ms)
    `placed_time`        BIGINT       NOT NULL,   -- JS timestamp (ms)
    `created_at`         TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── ORDER ITEMS (items inside each order) ──────────────────────
CREATE TABLE IF NOT EXISTS `order_items` (
    `id`           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `order_id`     INT UNSIGNED NOT NULL,
    `name`         VARCHAR(100) NOT NULL,
    `price`        DECIMAL(10,2) NOT NULL,
    `quantity`     INT UNSIGNED NOT NULL DEFAULT 1,
    `instructions` TEXT DEFAULT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── SAVED ADDRESSES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `addresses` (
    `id`         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id`    INT UNSIGNED NOT NULL,
    `label`      VARCHAR(100) NOT NULL,
    `street`     VARCHAR(200) NOT NULL,
    `city`       VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
