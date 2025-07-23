import { pool } from '../config/db';

export interface IAppointment {
  id?: number;
  patient_id: number;
  doctor_id: number;
  date: Date;
  status: string;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Appointment {
  static async create(appointmentData: Omit<IAppointment, 'id' | 'created_at' | 'updated_at'>): Promise<IAppointment> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO appointments (patient_id, doctor_id, date, status, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const values = [
        appointmentData.patient_id,
        appointmentData.doctor_id,
        appointmentData.date,
        appointmentData.status,
        appointmentData.notes
      ];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async findById(id: number): Promise<IAppointment | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM appointments WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async findAll(): Promise<IAppointment[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM appointments ORDER BY date DESC';
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async findByPatientId(patientId: number): Promise<IAppointment[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM appointments WHERE patient_id = $1 ORDER BY date DESC';
      const result = await client.query(query, [patientId]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async findByDoctorId(doctorId: number): Promise<IAppointment[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM appointments WHERE doctor_id = $1 ORDER BY date DESC';
      const result = await client.query(query, [doctorId]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async updateById(id: number, updates: Partial<IAppointment>): Promise<IAppointment | null> {
    const client = await pool.connect();
    try {
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const query = `
        UPDATE appointments
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
      `;
      const values = [id, ...Object.values(updates)];
      const result = await client.query(query, values);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async deleteById(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM appointments WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  }
}