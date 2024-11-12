// pages/api/transactions.js
import { Pool } from 'pg';

// Create a connection pool to your PostgreSQL instance
const pool = new Pool({
  host: '127.0.0.1',      // Google Cloud SQL instance IP or hostname
  port: process.env.PG_PORT || 5432,  // Default PostgreSQL port is 5432
  user: process.env.PG_USER,          // Database user
  password: process.env.PG_PASSWORD,  // Database password
  database: process.env.PG_DATABASE,  // Name of the database
  ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

export default async function handler(req, res) {
  // Handle POST request: Submit a new transaction
  if (req.method === 'POST') {
    const { amount, data, recipient } = req.body;

    try {
      // Perform an SQL INSERT statement to store the transaction in the database
      const result = await pool.query(
        'INSERT INTO transactions (amount, data, recipient) VALUES ($1, $2, $3) RETURNING id',
        [amount, JSON.stringify(data), recipient]
      );

      // Return the ID of the newly created transaction
      res.status(200).json({ success: true, transactionId: result.rows[0].id });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, error: error.message });
    }

  // Handle GET request: Fetch all transactions
  } else if (req.method === 'GET') {
    try {
      // Fetch transactions from the database
      const result = await pool.query('SELECT * FROM transactions');
      res.status(200).json({ success: true, transactions: result.rows });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, error: error.message });
    }

  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
