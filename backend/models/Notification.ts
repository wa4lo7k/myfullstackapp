import { pool } from '../config/db';

export interface INotification {
  id?: number;
  user_id: number;
  message: string;
  type?: string;
  read: boolean;
  created_at?: Date;
}

export class Notification {
  static async create(notificationData: Omit<INotification, 'id' | 'created_at'>): Promise<INotification> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO notifications (user_id, message, type, read)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const values = [
        notificationData.user_id,
        notificationData.message,
        notificationData.type || 'info',
        notificationData.read || false
      ];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async findById(id: number): Promise<INotification | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM notifications WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async findAll(): Promise<INotification[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM notifications ORDER BY created_at DESC';
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async findByUserId(userId: number): Promise<INotification[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC';
      const result = await client.query(query, [userId]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async markAsRead(id: number): Promise<INotification | null> {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE notifications
        SET read = true
        WHERE id = $1
        RETURNING *
      `;
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async deleteById(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM notifications WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  }
}