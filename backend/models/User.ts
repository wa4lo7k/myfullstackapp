import { pool } from '../config/db';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor' | 'admin';
  profile?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  static async create(userData: Omit<IUser, 'id' | 'created_at' | 'updated_at'>): Promise<IUser> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO users (name, email, password, role, profile)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const values = [
        userData.name,
        userData.email,
        userData.password,
        userData.role,
        userData.profile
      ];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(query, [email]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async findById(id: number): Promise<IUser | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async findAll(): Promise<IUser[]> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users ORDER BY created_at DESC';
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async updateById(id: number, updates: Partial<IUser>): Promise<IUser | null> {
    const client = await pool.connect();
    try {
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const query = `
        UPDATE users
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
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  }
}