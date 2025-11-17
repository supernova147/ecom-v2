require('dotenv').config(); // Have to install dotenv in order to use variables inside .env file
const express = require('express');
const cors = require('cors');
const path = require('path');

const { pool } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, './src/main.jsx')));

app.get('/', (req, res) => {
    console.log('Server connected to the port');
    // res.sendFile(path.join(__dirname, '../main.jsx'));
});

app.get('/health/db', async (_req, res) => {
  try {
    const [r] = await pool.query('SELECT 1 AS ok');
    res.json({ ok: r[0].ok === 1 });
  } catch (e) {
    console.error('[HEALTH DB]', e.code || e.name, e.message);
    res.status(500).json({ ok: false, code: e.code || e.name, msg: e.message });
  }
});


app.get('/api/vehicles', async (_req, res) => {
    try {
    const [rows] = await pool.query(`
        SELECT
            id,
            car_name,
            price_usd,
            range_mi,
            picture_path,
            vehicle_type
        FROM cars
        ORDER BY id ASC
        LIMIT 200
    `);
res.json(rows);
} catch (e) {
    console.error('GET /api/vehicles failed:', e);
    res.status(500).json({ error: 'query failed', detail: e.message });
}
});


app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '  '));
});


app.listen(process.env.PORT || 3000, () =>
    console.log('Backend is listening', process.env.PORT || 3000)
);
