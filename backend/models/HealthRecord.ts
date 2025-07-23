import { pool } from '../config/db';

export interface IHealthRecord {
  id?: number;
  user_id: number;
  type: string;
  data: any;
  date: Date;
  created_at?: Date;
}

export class HealthRecord {
  static async create(recordData: Omit<IHealthRecord, 'id' | 'created_at'>): Promise<IHealthRecord> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO health_records (user_id, type, data, date)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const values = [
        recordData.user_id,
        recordData.type,
        JSON.stringify(recordData.data),
        recordData.date
      ];
      const result = await client.query(query, values);
      const record = result.rows[0];
      // Parse JSON data back to object
      if (record.data) {
        record.data = JSON.parse(record.data);
      }
      return record;
    } finally {
      client.release();
    }
  }

  static async findById(id: number): Promise<IHealthRecord | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM health_records WHERE id = $1';
      const result = await client.query(query, [id]);
      const record = result.rows[0];
      if (record && record.data) {
        record.data = JSON.parse(record.data);
      }
      return record || null;
    } finally {
      client.release();
    }
  }

  static async findAll(): Promise<IHealthRecord[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM health_records ORDER BY date DESC';
      const result = await client.query(query);
      return result.rows.map(record => {
        if (record.data) {
          record.data = JSON.parse(record.data);
        }
        return record;
      });
    } finally {
      client.release();
    }
  }

  static async findByUserId(userId: number): Promise<IHealthRecord[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM health_records WHERE user_id = $1 ORDER BY date DESC';
      const result = await client.query(query, [userId]);
      return result.rows.map(record => {
        if (record.data) {
          record.data = JSON.parse(record.data);
        }
        return record;
      });
    } finally {
      client.release();
    }
  }

  static async updateById(id: number, updates: Partial<IHealthRecord>): Promise<IHealthRecord | null> {
    const client = await pool.connect();
    try {
      const updateData = { ...updates };
      if (updateData.data) {
        updateData.data = JSON.stringify(updateData.data);
      }

      const setClause = Object.keys(updateData)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const query = `
        UPDATE health_records
        SET ${setClause}
        WHERE id = $1
        RETURNING *
      `;
      const values = [id, ...Object.values(updateData)];
      const result = await client.query(query, values);
      const record = result.rows[0];
      if (record && record.data) {
        record.data = JSON.parse(record.data);
      }
      return record || null;
    } finally {
      client.release();
    }
  }

  static async deleteById(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM health_records WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  }
}