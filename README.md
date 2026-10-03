# Aurion — Excellence Electrified

An independent electric vehicle brand concept, rebuilt from the original hand-coded Aurion project. The original Z-1, X-1, C-1, and V-1 identities remain, with original generated vehicle imagery and a complete responsive showroom experience.

## Run it

Use Node.js 22.12+ or 24 LTS. Install the existing locked dependencies and start Vite:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. No database, API keys, or external services are needed for the showroom.

To run the production build with the existing Express server:

```sh
npm run build
npm start
```

Open `http://localhost:3000`. Express serves the built assets and handles direct links such as `/vehicles/z1`.

## Explore

- **Home:** original vehicle photography, switchable featured models, and the Aurion collection.
- **Vehicles:** body-style and budget filters, price/range sorting, and a side-by-side comparison of up to three models.
- **Build:** choose a drive, exterior finish, and wheels with live pricing and trim specifications. Concept photos show a fixed studio finish; selected options appear in the summary.
- **Saved builds:** save up to 12 configurations in browser local storage, resume them with the same choices, or remove them. No account or server is involved.
- **Electric living:** interactive daily charging estimate, ownership information, and expandable FAQs. The estimator assumes a 90 kWh usable battery, the selected model's concept range, 90% charging efficiency, and either an 11 kW charger or a 1.4 kW outlet.
- **Experience Aurion:** validated demo-drive form and an honest confirmation. No appointment is booked, no email is sent, and form information remains in React state for the current page session.

## Stack

React 19, React Router 7, Vite 7, plain CSS, Express 5, and the original MySQL integration. **No npm dependencies were added.** Browser interactions use React and platform APIs; icons and the charging artwork use SVG and CSS. Manrope is self-hosted under its included SIL Open Font License.

## Optional legacy database API

The showcase frontend intentionally uses `src/data/vehicles.json` so it runs without the original database and keeps the generated concepts consistent. The existing Express API remains available:

- `GET /api/vehicles`: bundled Aurion catalog by default.
- `GET /health`: runtime health and mode.
- `GET /health/db`: database readiness or an explicit indication that concept mode is active.

To use the original MySQL `cars` table for the API, copy `.env.example` to `.env`, set `DATABASE_URL`, and optionally provide `DATABASE_CA_PATH` for your database provider's certificate bundle. The original columns remain `id`, `car_name`, `price_usd`, `range_mi`, `picture_path`, and `vehicle_type`. Database configuration affects the API only, not the standalone concept showroom. TLS verifies certificates by default; `DATABASE_SSL=false` is available for a local development database. Do not commit credentials or certificate files.

## Validate

```sh
npm run lint
npm run build
npm test
```

The tests use Node's built-in test runner and verify database-free startup, original model identities and local image assets, API 404 behavior, and production deep links. Build before running the tests. The tests do not contact a remote database.

The rebuild was also checked in Chromium at 390, 768, 1024, and 1440 px, including filters, comparisons, build pricing, persistence, restored choices, demo-form validation, charging estimates, mobile navigation, missing assets, and horizontal overflow. Browser automation used tooling already installed in the workspace and adds no project dependency.

## Assets and concept boundaries

New optimized vehicle images live at `public/images/aurion-*.webp`. The original photographs remain in `public/images` for project history but are not used by the new showroom. Generated source images are retained in the cloud workspace. Font license: `public/fonts/OFL.txt`.

Aurion is a fictional brand concept, unaffiliated with Tesla or any other manufacturer. Vehicle designs, prices, specifications, and offers are illustrative. This branch demonstrates a brand and shopping experience; it does not process payments, purchases, real reservations, or live charging-network information.
