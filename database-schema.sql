-- HealthSync PostgreSQL Database Schema for Render Deployment
-- Run this script in your Render PostgreSQL database after creation

-- Enable UUID extension for future use
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
    profile TEXT,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create health records table
CREATE TABLE IF NOT EXISTS health_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success', 'appointment', 'lab_results', 'patient_assignment')),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create device data table
CREATE TABLE IF NOT EXISTS device_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_type VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AI insights table
CREATE TABLE IF NOT EXISTS ai_insights (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    insight TEXT NOT NULL,
    confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

CREATE INDEX IF NOT EXISTS idx_health_records_user ON health_records(user_id);
CREATE INDEX IF NOT EXISTS idx_health_records_type ON health_records(type);
CREATE INDEX IF NOT EXISTS idx_health_records_date ON health_records(date);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

CREATE INDEX IF NOT EXISTS idx_device_data_user ON device_data(user_id);
CREATE INDEX IF NOT EXISTS idx_device_data_type ON device_data(device_type);
CREATE INDEX IF NOT EXISTS idx_device_data_timestamp ON device_data(timestamp);

CREATE INDEX IF NOT EXISTS idx_ai_insights_user ON ai_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_created_at ON ai_insights(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at 
    BEFORE UPDATE ON appointments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing (with proper password hashing)
-- Password for all sample users is 'password' (hashed with bcrypt)
INSERT INTO users (name, email, password, role, profile, phone, address) VALUES
    ('Admin User', 'admin@healthsync.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'System Administrator with full access to manage the HealthSync platform', '+1-555-0001', '123 Admin St, Healthcare City, HC 12345'),
    ('Dr. John Smith', 'doctor@healthsync.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', 'Cardiologist with 15 years of experience in cardiovascular medicine', '+1-555-0002', '456 Medical Ave, Healthcare City, HC 12346'),
    ('Dr. Sarah Johnson', 'sarah.johnson@healthsync.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', 'General Practitioner specializing in family medicine', '+1-555-0003', '789 Doctor Blvd, Healthcare City, HC 12347'),
    ('Jane Doe', 'patient@healthsync.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', 'Regular patient for routine checkups and preventive care', '+1-555-0004', '321 Patient Rd, Healthcare City, HC 12348'),
    ('John Patient', 'john.patient@healthsync.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', 'Patient with chronic condition management', '+1-555-0005', '654 Wellness Way, Healthcare City, HC 12349')
ON CONFLICT (email) DO NOTHING;

-- Insert sample appointments
INSERT INTO appointments (patient_id, doctor_id, date, status, notes) VALUES
    (4, 2, '2025-07-25 10:00:00', 'scheduled', 'Regular checkup appointment - annual physical examination'),
    (4, 2, '2025-07-30 14:30:00', 'scheduled', 'Follow-up consultation for blood pressure monitoring'),
    (5, 3, '2025-07-26 09:00:00', 'confirmed', 'Diabetes management consultation'),
    (5, 2, '2025-08-02 11:00:00', 'scheduled', 'Cardiology consultation for chest pain evaluation')
ON CONFLICT DO NOTHING;

-- Insert sample health records
INSERT INTO health_records (user_id, type, data, date) VALUES
    (4, 'vital_signs', '{"blood_pressure": "120/80", "heart_rate": 72, "temperature": 98.6, "weight": 70, "height": 170, "bmi": 24.2}', '2025-07-23 08:30:00'),
    (4, 'lab_results', '{"cholesterol": 180, "glucose": 95, "hemoglobin": 14.2, "white_blood_cells": 7500, "platelets": 250000}', '2025-07-22 10:00:00'),
    (5, 'vital_signs', '{"blood_pressure": "140/90", "heart_rate": 78, "temperature": 98.4, "weight": 85, "height": 175, "bmi": 27.8}', '2025-07-23 09:15:00'),
    (5, 'lab_results', '{"glucose": 145, "hba1c": 7.2, "cholesterol": 220, "triglycerides": 180}', '2025-07-21 14:30:00')
ON CONFLICT DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (user_id, message, type, read) VALUES
    (4, 'Your appointment with Dr. John Smith is scheduled for tomorrow at 10:00 AM', 'appointment', false),
    (4, 'Your lab results are now available in your health records', 'lab_results', false),
    (4, 'Reminder: Please fast for 12 hours before your blood work appointment', 'info', true),
    (2, 'New patient Jane Doe has been assigned to you', 'patient_assignment', false),
    (2, 'Patient John Patient has requested an appointment', 'appointment', false),
    (5, 'Your diabetes management plan has been updated', 'info', false)
ON CONFLICT DO NOTHING;

-- Insert sample device data
INSERT INTO device_data (user_id, device_type, data, timestamp) VALUES
    (4, 'fitness_tracker', '{"steps": 8500, "calories": 2100, "distance": 6.2, "active_minutes": 45, "sleep_hours": 7.5}', '2025-07-23 23:59:59'),
    (4, 'blood_pressure_monitor', '{"systolic": 118, "diastolic": 78, "pulse": 70, "measurement_time": "2025-07-23T08:30:00Z"}', '2025-07-23 08:30:00'),
    (5, 'glucose_meter', '{"glucose_level": 142, "measurement_type": "fasting", "measurement_time": "2025-07-23T07:00:00Z"}', '2025-07-23 07:00:00'),
    (5, 'fitness_tracker', '{"steps": 6200, "calories": 1800, "distance": 4.1, "active_minutes": 30, "sleep_hours": 8.0}', '2025-07-23 23:59:59')
ON CONFLICT DO NOTHING;

-- Insert sample AI insights
INSERT INTO ai_insights (user_id, insight, confidence, created_at) VALUES
    (4, 'Based on your recent activity data, consider increasing your daily water intake to improve overall health metrics', 0.85, '2025-07-23 10:00:00'),
    (4, 'Your sleep pattern shows improvement over the last week. Maintain current bedtime routine for optimal rest', 0.92, '2025-07-22 09:00:00'),
    (5, 'Blood glucose levels indicate good diabetes management. Continue current medication regimen', 0.88, '2025-07-23 11:30:00'),
    (5, 'Consider increasing physical activity by 15 minutes daily to improve cardiovascular health', 0.79, '2025-07-21 16:45:00')
ON CONFLICT DO NOTHING;

-- Create a view for appointment details with user information
CREATE OR REPLACE VIEW appointment_details AS
SELECT 
    a.id,
    a.date,
    a.status,
    a.notes,
    p.name AS patient_name,
    p.email AS patient_email,
    d.name AS doctor_name,
    d.email AS doctor_email,
    a.created_at,
    a.updated_at
FROM appointments a
JOIN users p ON a.patient_id = p.id
JOIN users d ON a.doctor_id = d.id;

-- Grant necessary permissions (adjust as needed for your Render setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_render_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_render_user;

-- Display success message
SELECT 'HealthSync database schema created successfully!' as status,
       'Sample data inserted for testing' as note,
       'Ready for production deployment on Render' as deployment_status;
