import { pool } from '../config/db';

export interface IAIInsight {
  id?: number;
  user_id: number;
  insight: string;
  confidence?: number;
  created_at?: Date;
}

export class AIInsight {
  static async create(insightData: Omit<IAIInsight, 'id' | 'created_at'>): Promise<IAIInsight> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO ai_insights (user_id, insight, confidence)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const values = [
        insightData.user_id,
        insightData.insight,
        insightData.confidence || 0.5
      ];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async findById(id: number): Promise<IAIInsight | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM ai_insights WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async findAll(): Promise<IAIInsight[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM ai_insights ORDER BY created_at DESC';
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async findByUserId(userId: number): Promise<IAIInsight[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM ai_insights WHERE user_id = $1 ORDER BY created_at DESC';
      const result = await client.query(query, [userId]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async deleteById(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM ai_insights WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  }
}