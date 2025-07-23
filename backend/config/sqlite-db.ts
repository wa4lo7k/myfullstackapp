import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import bcrypt from 'bcryptjs';

let db: Database<sqlite3.Database, sqlite3.Statement>;

const connectSQLiteDB = async () => {
  try {
    // Create database file in backend directory
    const dbPath = path.join(__dirname, '..', 'healthsync.db');
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log('SQLite database connected successfully');
    console.log(`Database file: ${dbPath}`);

    // Create tables
    await createTables();
    
    // Insert sample data
    await insertSampleData();
    
    return db;
  } catch (error) {
    console.error('SQLite connection failed:', error);
    process.exit(1);
  }
};

const createTables = async () => {
  try {
    // Users table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'patient',
        profile TEXT,
        phone TEXT,
        address TEXT,
        date_of_birth DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Appointments table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER REFERENCES users(id),
        doctor_id INTEGER REFERENCES users(id),
        date DATETIME NOT NULL,
        status TEXT DEFAULT 'scheduled',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Health records table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS health_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        type TEXT NOT NULL,
        data TEXT NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Notifications table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        message TEXT NOT NULL,
        type TEXT DEFAULT 'info',
        read BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Device data table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS device_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        device_type TEXT NOT NULL,
        data TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // AI insights table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS ai_insights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        insight TEXT NOT NULL,
        confidence REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    await db.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
      CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
      CREATE INDEX IF NOT EXISTS idx_health_records_user ON health_records(user_id);
      CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
      CREATE INDEX IF NOT EXISTS idx_device_data_user ON device_data(user_id);
      CREATE INDEX IF NOT EXISTS idx_ai_insights_user ON ai_insights(user_id);
    `);

    console.log('SQLite tables created successfully');
  } catch (error) {
    console.error('Error creating SQLite tables:', error);
  }
};

const insertSampleData = async () => {
  try {
    // Check if users already exist
    const existingUsers = await db.get('SELECT COUNT(*) as count FROM users');
    if (existingUsers.count > 0) {
      console.log('Sample data already exists, skipping insertion');
      return;
    }

    // Hash password for sample users
    const hashedPassword = await bcrypt.hash('password', 10);

    // Insert sample users
    await db.run(`
      INSERT INTO users (name, email, password, role, profile) VALUES
      ('Admin User', 'admin@healthsync.com', ?, 'admin', 'System Administrator')
    `, [hashedPassword]);

    await db.run(`
      INSERT INTO users (name, email, password, role, profile) VALUES
      ('Dr. John Smith', 'doctor@healthsync.com', ?, 'doctor', 'Cardiologist with 15 years experience')
    `, [hashedPassword]);

    await db.run(`
      INSERT INTO users (name, email, password, role, profile) VALUES
      ('Jane Doe', 'patient@healthsync.com', ?, 'patient', 'Regular patient for routine checkups')
    `, [hashedPassword]);

    // Insert sample appointments
    await db.run(`
      INSERT INTO appointments (patient_id, doctor_id, date, status, notes) VALUES
      (3, 2, '2025-07-25 10:00:00', 'scheduled', 'Regular checkup appointment'),
      (3, 2, '2025-07-30 14:30:00', 'scheduled', 'Follow-up consultation')
    `);

    // Insert sample health records
    await db.run(`
      INSERT INTO health_records (user_id, type, data) VALUES
      (3, 'vital_signs', '{"blood_pressure": "120/80", "heart_rate": 72, "temperature": 98.6, "weight": 70}'),
      (3, 'lab_results', '{"cholesterol": 180, "glucose": 95, "hemoglobin": 14.2}')
    `);

    // Insert sample notifications
    await db.run(`
      INSERT INTO notifications (user_id, message, type) VALUES
      (3, 'Your appointment with Dr. John Smith is scheduled for tomorrow at 10:00 AM', 'appointment'),
      (3, 'Your lab results are now available', 'lab_results'),
      (2, 'New patient Jane Doe has been assigned to you', 'patient_assignment')
    `);

    // Insert sample device data
    await db.run(`
      INSERT INTO device_data (user_id, device_type, data) VALUES
      (3, 'fitness_tracker', '{"steps": 8500, "calories": 2100, "distance": 6.2, "active_minutes": 45}'),
      (3, 'blood_pressure_monitor', '{"systolic": 118, "diastolic": 78, "pulse": 70, "timestamp": "2025-07-23T08:30:00Z"}')
    `);

    // Insert sample AI insights
    await db.run(`
      INSERT INTO ai_insights (user_id, insight, confidence) VALUES
      (3, 'Based on your recent activity data, consider increasing your daily water intake', 0.85),
      (3, 'Your sleep pattern shows improvement over the last week', 0.92)
    `);

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

// Export the database instance
export { db, connectSQLiteDB };
export default connectSQLiteDB;
