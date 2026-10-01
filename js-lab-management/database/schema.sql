-- ========================================================
-- JS Lab Management System - Database Schema
-- Database: js_lab_db
-- ========================================================

-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS js_lab_db;
USE js_lab_db;

-- --------------------------------------------------------
-- Table: students
-- Description: Stores student enrollment information for the JS Lab
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    course VARCHAR(100) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table: experiments
-- Description: Stores laboratory experiments, modules, and completion status
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS experiments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    experiment_name VARCHAR(150) NOT NULL,
    module VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('Pending', 'Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Sample Data: Insert default students for viva/practical demo
-- --------------------------------------------------------
INSERT INTO students (student_id, name, email, course, semester) VALUES
('JS-2026-001', 'Aman Sharma', 'aman.sharma@example.edu', 'B.Tech CSE', 'Semester 4'),
('JS-2026-002', 'Riya Patel', 'riya.patel@example.edu', 'B.Tech IT', 'Semester 4'),
('JS-2026-003', 'Rahul Verma', 'rahul.verma@example.edu', 'BCA', 'Semester 2')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- --------------------------------------------------------
-- Sample Data: Insert default laboratory syllabus experiments
-- --------------------------------------------------------
INSERT INTO experiments (experiment_name, module, description, status) VALUES
('Syntax, Variables and Scope in JS', 'Module 1 - Basics', 'Demonstrate var, let, const, hoisting, block scope and functions.', 'Completed'),
('Data Types and Type Conversion', 'Module 2 - Data & Ops', 'Demonstrate primitive vs reference types, typeof, explicit and implicit casting.', 'Completed'),
('Operators and Control Structures', 'Module 2 - Data & Ops', 'Implement arithmetic/relational calculators, if-else grade checks and switch-case.', 'Completed'),
('Loops and Jump Statements', 'Module 3 - Control Flow', 'Execute for, while, do-while, for-of, for-in loops with break and continue.', 'Completed'),
('Error Handling with Try/Catch/Throw', 'Module 3 - Control Flow', 'Safe error handling and validation with custom throw statements.', 'Pending'),
('Math and Date Object Applications', 'Module 4 - Standard Objects', 'Generate random numbers, date formatting, and age calculation routines.', 'Pending'),
('String and Array Manipulations', 'Module 4 - Standard Objects', 'Explore slice, splice, map, filter, reduce, indexOf, and regex parsing.', 'Pending'),
('Functions, Scope and Closures', 'Module 5 - Advanced Functions', 'Implement arrow functions, lexical scoping, and persistent counter closure.', 'Pending')
ON DUPLICATE KEY UPDATE experiment_name=VALUES(experiment_name);
