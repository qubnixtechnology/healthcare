# GL Healthcare Pharma Website

A full-stack website for GL Healthcare based on the provided intake brief.

## Structure

- `frontend/` React.js + Vite customer website
- `backend/` PHP API
- `backend/database/schema.sql` MySQL database schema and seed products

## Pages

Home, About, Login / Signup, Dashboard, Product / Service, Contact.

## Local setup

Backend:

```bash
cd backend
copy .env.example .env
php -S localhost:8000 -t .
```

Database:

```bash
mysql -u root -p < backend/database/schema.sql
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173`.
