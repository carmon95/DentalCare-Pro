-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 07, 2026 at 04:38 AM
-- Server version: 9.4.0
-- PHP Version: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dental_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','DOCTOR','ASSISTANT') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `patients` (
  `id` int NOT NULL,
  `full_name` varchar(200) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text,
  `email` varchar(100) DEFAULT NULL,
  `allergies` text,
  `medical_conditions` text,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `settings` (
  `id` int NOT NULL,
  `clinic_name` varchar(255) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text,
  `opening_time` time DEFAULT NULL,
  `closing_time` time DEFAULT NULL,
  `appointment_duration` int DEFAULT '30'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `treatments` (
  `id` int NOT NULL,
  `patient_id` int NOT NULL,
  `start_date` date DEFAULT NULL,
  `treatment_type` varchar(255) NOT NULL,
  `cost` decimal(10,2) DEFAULT '0.00',
  `status` varchar(50) DEFAULT 'PENDIENTE',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `appointments` (
  `id` int NOT NULL,
  `patient_id` int NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` enum('PENDIENTE','CONFIRMADA','ATENDIDA','CANCELADA') DEFAULT 'PENDIENTE',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `clinical_histories` (
  `id` int NOT NULL,
  `patient_id` int NOT NULL,
  `chief_complaint` text,
  `medical_history` text,
  `allergies` text,
  `current_medications` text,
  `diagnosis` text,
  `treatment_plan` text,
  `blood_pressure` varchar(20) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `treatment_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);
ALTER TABLE `clinical_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `treatment_id` (`treatment_id`);
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_treatment_patient` (`patient_id`);
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);
ALTER TABLE `appointments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `clinical_histories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `patients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `treatments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);
ALTER TABLE `clinical_histories`
  ADD CONSTRAINT `clinical_histories_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE CASCADE;
ALTER TABLE `treatments`
  ADD CONSTRAINT `fk_treatment_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;