// src/db.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mysql = require('mysql2/promise');


if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing');
}
const u = new URL(process.env.DATABASE_URL);

let caPem = undefined;

if (process.env.RDS_CA_PEM) {
    caPem = process.env.RDS_CA_PEM.replace(/\\n/g, '\n');
} else if (process.env.RDS_CA_PEM_B64) {
    caPem = Buffer.from(process.env.RDS_CA_PEM_B64, 'base64').toString('utf8');
}

const ssl = caPem
    ? { ca: caPem, rejectUnauthorized: true }
    : { rejectUnauthorized: false }; 

const pool = mysql.createPool({
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ''),
    ssl,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

console.log('DB host raw:', u.hostname);
console.log('DB host JSON:', JSON.stringify(u.hostname)); // shows hidden chars
console.log('DB name:', u.pathname.replace(/^\//, ''));


module.exports = { pool };
