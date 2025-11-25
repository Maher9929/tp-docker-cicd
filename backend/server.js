const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Configuration de la base de données pour Render
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  // Pour Render PostgreSQL
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.use(express.json());

// Test endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from Backend on Render!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    success: true
  });
});

// Database endpoint
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const results = { results: result ? result.rows : null };
    res.json({
      message: 'Data from Database on Render',
      data: results.results,
      success: true
    });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Database error',
      success: false
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend server running on port ${port}`);
});
