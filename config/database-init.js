import pool from './database.js';

// Create dreams table if it doesn't exist
export async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS dreams (
        id SERIAL PRIMARY KEY,
        device_id TEXT NOT NULL,
        dream_text TEXT NOT NULL,
        interpretation TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Index for fast lookups scoped to a single device
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_dreams_device_id ON dreams (device_id)
    `);

    console.log('Database initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  } finally {
    client.release();
  }
}

export default pool;