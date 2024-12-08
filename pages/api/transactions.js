
  import { Pool } from 'pg';


  const pool = new Pool({
    host: '127.0.0.1',      
    port: process.env.PG_PORT || 5432,  
    user: process.env.PG_USER,          
    password: process.env.PG_PASSWORD,  
    database: process.env.PG_DATABASE,  
    ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  export default async function handler(req, res) {

    if (req.method === 'POST') {
      const { amount, data, recipient } = req.body;

      try {
      
        const result = await pool.query(
          'INSERT INTO transactions (amount, data, recipient) VALUES ($1, $2, $3) RETURNING id',
          [amount, JSON.stringify(data), recipient]
        );

        
        res.status(200).json({ success: true, transactionId: result.rows[0].id });
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: error.message });
      }


    } else if (req.method === 'GET') {
      try {
      
        const result = await pool.query('SELECT * FROM transactions');
        res.status(200).json({ success: true, transactions: result.rows });
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: error.message });
      }

    } else {
    
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
