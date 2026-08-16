require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Kết nối PostgreSQL trên Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Bắt buộc khi dùng PostgreSQL của Render
  }
});

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Server đang chạy thành công! Thời gian DB: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi kết nối cơ sở dữ liệu');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});