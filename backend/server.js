require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');
const vehicles = require('../src/data/vehicles.json');
const { pool } = require('./db');
const app = express();
const port = Number(process.env.PORT) || 3000;
const dist = path.join(__dirname, '../dist');

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '32kb' }));
app.get('/health', (_req, res) => res.json({ ok: true, mode: pool ? 'database' : 'concept' }));
app.get('/health/db', async (_req, res) => {
  if (!pool) return res.json({ ok: true, mode: 'concept', databaseConfigured: false });
  try { const [rows] = await pool.query('SELECT 1 AS ok'); res.json({ ok: rows[0].ok === 1, databaseConfigured: true }); }
  catch (error) { console.error('[DB health]', error.code || error.name); res.status(503).json({ ok: false, error: 'Database unavailable' }); }
});
app.get('/api/vehicles', async (_req, res) => {
  if (!pool) return res.json(vehicles);
  try {
    const [rows] = await pool.query('SELECT id, car_name, price_usd, range_mi, picture_path, vehicle_type FROM cars ORDER BY id ASC LIMIT 200');
    res.json(rows);
  } catch (error) { console.error('[Vehicle query]', error.code || error.name); res.status(503).json({ error: 'Vehicle catalog unavailable' }); }
});
app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found' }));
if (fs.existsSync(path.join(dist, 'index.html'))) {
  app.use(express.static(dist));
  app.get('/{*splat}', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  app.get('/', (_req, res) => res.json({ name: 'Aurion', message: 'Run npm run dev for development, or npm run build before npm start.' }));
}
if (require.main === module) app.listen(port, '0.0.0.0', () => console.log(`Aurion listening on port ${port} (${pool ? 'database' : 'concept'} mode)`));
module.exports = app;
