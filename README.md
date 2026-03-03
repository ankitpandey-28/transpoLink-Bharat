# TranspoLink Bharat

TranspoLink Bharat is a full-stack logistics platform that connects truck drivers/owners with businesses that need to move goods.
It lets users post and browse available trucks and available goods, manage bookings, and use the UI in English/Hindi.

## What this application does

- For businesses (clients): post goods/cargo requirements, browse available trucks, create bookings.
- For drivers/owners: post truck availability, browse available goods, accept/coordinate bookings.

## Key features

- JWT authentication (register, login, protected routes)
- Goods and truck listings (create, browse, update)
- Bookings (create, accept/reject flows)
- Bilingual UI (English <-> Hindi toggle)

## Tech stack

- Frontend: React (Create React App), Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

## Project structure

- frontend/  (React app UI)
- backend/   (Express API + MongoDB models)
- docs/      (documentation)

## Run locally

Prerequisites: Node.js (LTS recommended), MongoDB (local) or MongoDB Atlas.

Backend:
1) cd backend
2) npm install
3) copy .env.example .env
4) Set MONGODB_URI=mongodb://localhost:27017/transpolink-bharat in backend/.env
5) npm run dev

Frontend:
1) cd frontend
2) npm install
3) npm start

Frontend API base URL:
- Uses REACT_APP_API_URL (example: http://localhost:5000/api).
- If not set, defaults to http://localhost:5000/api.

## API (high level)

- GET /api/health
- POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- Goods: /api/goods
- Trucks: /api/trucks
- Bookings: /api/bookings (see backend/src/routes/bookings.js)

## Common issues

- Invalid credentials: your local MongoDB is a fresh database; sign up first.
- MongoDB ECONNREFUSED 127.0.0.1:27017: MongoDB is not running locally.

## Environment files

.env files are not committed to Git. Use backend/.env.example and frontend/.env.example.

## More docs

See docs/ for detailed guides (setup, translation system, troubleshooting).
