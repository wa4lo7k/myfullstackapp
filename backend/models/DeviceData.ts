import { pool } from '../config/db';

export interface IDeviceData {
  id?: number;
  user_id: number;
  device_type: string;
  data: any;
  timestamp: Date;
}

export class DeviceData {
  static async create(deviceData: Omit<IDeviceData, 'id'>): Promise<IDeviceData> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO device_data (user_id, device_type, data, timestamp)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const values = [
        deviceData.user_id,
        deviceData.device_type,
        JSON.stringify(deviceData.data),
        deviceData.timestamp
      ];
      const result = await client.query(query, values);
      const record = result.rows[0];
      if (record.data) {
        record.data = JSON.parse(record.data);
      }
      return record;
    } finally {
      client.release();
    }
  }

  static async findById(id: number): Promise<IDeviceData | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM device_data WHERE id = $1';
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

  static async findAll(): Promise<IDeviceData[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM device_data ORDER BY timestamp DESC';
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

  static async findByUserId(userId: number): Promise<IDeviceData[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM device_data WHERE user_id = $1 ORDER BY timestamp DESC';
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

  static async deleteById(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM device_data WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  }
}