const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Keep the showcase tests isolated from any configured production database.
process.env.DATABASE_URL = '';
const app = require('../backend/server');
let server;
let base;
before(async () => {
  server = await new Promise((resolve) => {
    const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
  });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { server.closeAllConnections(); await new Promise((resolve) => server.close(resolve)); });

test('concept mode works without database credentials', async () => {
  const response = await fetch(`${base}/health/db`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, mode: 'concept', databaseConfigured: false });
});
test('catalog serves every original Aurion model with a local image', async () => {
  const response = await fetch(`${base}/api/vehicles`);
  assert.equal(response.status, 200);
  const cars = await response.json();
  assert.deepEqual(cars.map((car) => car.car_name), ['Z-1', 'X-1', 'C-1', 'V-1']);
  for (const car of cars) {
    assert.ok(car.price_usd > 0 && car.range_mi > 0);
    assert.ok(fs.existsSync(path.join(__dirname, '../public', car.picture_path)));
  }
});
test('unknown API endpoints return JSON 404 instead of the app', async () => {
  const response = await fetch(`${base}/api/does-not-exist`);
  assert.equal(response.status, 404);
  assert.equal((await response.json()).error, 'Endpoint not found');
});
test('production deep links serve the app shell', async () => {
  assert.ok(fs.existsSync(path.join(__dirname, '../dist/index.html')), 'Run npm run build before npm test');
  const response = await fetch(`${base}/vehicles/z1`);
  assert.equal(response.status, 200);
  assert.ok((await response.text()).includes('<div id="root"></div>'));
});
