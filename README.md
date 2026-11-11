# CreatorIQ – Creator Analytics & Content Performance Dashboard

Milestone 1 (Weeks 1–2): project initialization, authentication with role-based
access, and a creator analytics dashboard using realistic mock data.

## Tech Stack

- Frontend: React (Vite), JavaScript, Tailwind CSS, React Router, Axios, Recharts
- Backend: Python, FastAPI, SQLAlchemy, Pydantic, Alembic
- Database: PostgreSQL
- Authentication: JWT (added in a later phase)

## Project Structure

```
creatoriq/
├── backend/    # FastAPI application
└── frontend/   # React application
```

## Prerequisites

- Python 3.11+
- Node.js 20.19+ (or 22.12+)
- PostgreSQL

## Database Setup

Create an empty database named `creatoriq`:

```sql
CREATE DATABASE creatoriq;
```

## Backend Setup

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
# Copy .env.example to .env and set your PostgreSQL password
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Health checks: `/api/health` and `/api/health/db`

## Frontend Setup

```bash
cd frontend
npm install
# Copy .env.example to .env
npm run dev
```

App: http://localhost:5173

## Migrations (Alembic)

Run from the `backend` folder with the virtual environment active:

```bash
alembic revision --autogenerate -m "describe change"
alembic upgrade head
```

## Scope

Milestone 1 only. No real social media API integration, revenue tracking,
notifications, report exports, forecasting, or deployment.