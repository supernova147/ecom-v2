// src/db.js
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mysql = require('mysql2/promise');


if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing');
}
const u = new URL(process.env.DATABASE_URL);

const caPath = path.join(__dirname, 'certs', 'rds-global-bundle.pem');
const caPem = fs.readFileSync(caPath, 'utf8');
console.log('[DB] Using CA file:', caPath, 'length:', caPem.length);

const pool = mysql.createPool({
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ''),
    ssl: { ca: caPem, rejectUnauthorized: true },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

console.log('DB host raw:', u.hostname);
console.log('DB host JSON:', JSON.stringify(u.hostname));
console.log('DB name:', u.pathname.replace(/^\//, ''));


module.exports = { pool };
