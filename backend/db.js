const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });
const mysql = require('mysql2/promise');

// Database access is optional for the concept showcase. No remote database is
// contacted unless DATABASE_URL is explicitly configured by the operator.
function createPool() {
  if (!process.env.DATABASE_URL) return null;
  const url = new URL(process.env.DATABASE_URL);
  if (url.protocol !== 'mysql:') throw new Error('DATABASE_URL must use mysql://');
  const ssl = process.env.DATABASE_SSL === 'false' ? undefined : {
    rejectUnauthorized: true,
    ...(process.env.DATABASE_CA_PATH ? { ca: fs.readFileSync(path.resolve(process.env.DATABASE_CA_PATH), 'utf8') } : {}),
  };
  return mysql.createPool({
    host: url.hostname,
    port: Number(url.port) || 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    ssl,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000,
    queueLimit: 0,
  });
}
module.exports = { pool: createPool() };
