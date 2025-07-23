# HealthSync Supabase Database Setup

## 🚀 Quick Setup Instructions

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose organization and enter:
   - **Name**: `healthsync`
   - **Database Password**: `healthsync_secure_password_123`
   - **Region**: Choose closest to your location
5. Click "Create new project"

### 2. Get Database Connection Details
After project creation, go to:
- **Settings** → **Database**
- Copy the **Connection string** (URI format)
- It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### 3. Run Database Schema
1. Go to **SQL Editor** in Supabase dashboard
2. Click "New query"
3. Copy and paste the SQL below:

```sql
-- HealthSync Database Schema for Supabase

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'patient',
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
    patient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create health records table
CREATE TABLE IF NOT EXISTS health_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create device data table
CREATE TABLE IF NOT EXISTS device_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    device_type VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AI insights table
CREATE TABLE IF NOT EXISTS ai_insights (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    insight TEXT NOT NULL,
    confidence DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_health_records_user ON health_records(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_device_data_user ON device_data(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_user ON ai_insights(user_id);

-- Insert sample data for testing
INSERT INTO users (name, email, password, role, profile) VALUES
    ('Admin User', 'admin@healthsync.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'System Administrator'),
    ('Dr. John Smith', 'doctor@healthsync.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'doctor', 'Cardiologist with 15 years experience'),
    ('Jane Doe', 'patient@healthsync.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'patient', 'Regular patient for routine checkups')
ON CONFLICT (email) DO NOTHING;

-- Insert sample appointments
INSERT INTO appointments (patient_id, doctor_id, date, status, notes) VALUES
    (3, 2, '2025-07-25 10:00:00', 'scheduled', 'Regular checkup appointment'),
    (3, 2, '2025-07-30 14:30:00', 'scheduled', 'Follow-up consultation');

-- Insert sample health records
INSERT INTO health_records (user_id, type, data) VALUES
    (3, 'vital_signs', '{"blood_pressure": "120/80", "heart_rate": 72, "temperature": 98.6, "weight": 70}'),
    (3, 'lab_results', '{"cholesterol": 180, "glucose": 95, "hemoglobin": 14.2}');

-- Insert sample notifications
INSERT INTO notifications (user_id, message, type) VALUES
    (3, 'Your appointment with Dr. John Smith is scheduled for tomorrow at 10:00 AM', 'appointment'),
    (3, 'Your lab results are now available', 'lab_results'),
    (2, 'New patient Jane Doe has been assigned to you', 'patient_assignment');

-- Insert sample device data
INSERT INTO device_data (user_id, device_type, data) VALUES
    (3, 'fitness_tracker', '{"steps": 8500, "calories": 2100, "distance": 6.2, "active_minutes": 45}'),
    (3, 'blood_pressure_monitor', '{"systolic": 118, "diastolic": 78, "pulse": 70, "timestamp": "2025-07-23T08:30:00Z"}');

-- Insert sample AI insights
INSERT INTO ai_insights (user_id, insight, confidence) VALUES
    (3, 'Based on your recent activity data, consider increasing your daily water intake', 0.85),
    (3, 'Your sleep pattern shows improvement over the last week', 0.92);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Click "Run" to execute the schema

### 4. Update Backend Environment
Update your `backend/.env` file with the Supabase connection string:

```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your_super_secret_jwt_key_here
```

### 5. Test Connection
Restart your backend server and test the connection.

## 🔑 Sample Login Credentials

After setup, you can test with these accounts:

**Admin Account:**
- Email: `admin@healthsync.com`
- Password: `password` (hashed in database)

**Doctor Account:**
- Email: `doctor@healthsync.com`
- Password: `password` (hashed in database)

**Patient Account:**
- Email: `patient@healthsync.com`
- Password: `password` (hashed in database)

## 📊 Database Features

✅ **Tables Created:**
- users (with roles: admin, doctor, patient)
- appointments (with patient-doctor relationships)
- health_records (with JSONB data storage)
- notifications (with read/unread status)
- device_data (IoT device integration)
- ai_insights (AI-generated health insights)

✅ **Sample Data:**
- 3 test users (admin, doctor, patient)
- 2 sample appointments
- Health records with vital signs and lab results
- Notifications for different user types
- Device data from fitness trackers
- AI-generated health insights

✅ **Performance Optimizations:**
- Indexes on frequently queried columns
- Foreign key relationships with CASCADE deletes
- Automatic timestamp updates with triggers

## 🚀 Next Steps

1. Create Supabase project
2. Run the SQL schema
3. Update DATABASE_URL in backend/.env
4. Restart backend server
5. Test registration and login functionality
6. Access pgAdmin-like interface in Supabase dashboard

Your HealthSync application will be fully functional with a cloud PostgreSQL database!
