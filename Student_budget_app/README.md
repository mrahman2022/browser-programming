# Student Budget App

## Overview
Student Budget is a personal finance and expense tracker for international students in Finland.

## Features
- Add income and expense transactions
- Categorize spending
- Set monthly budgets
- Filter by month, type, and category
- View totals and charts
- Store data in Supabase through a Node.js backend

## Stack
- Frontend: HTML, CSS, JavaScript, Chart.js
- Backend: Node.js, Express
- Database: Supabase Postgres

## Structure
- `frontend/` contains the user interface
- `backend/` contains the API server
- `README.md` contains project documentation

## Backend API
- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`
- `GET /api/budgets`
- `POST /api/budgets`

## Local run

### Backend
```bash
cd backend
npm install
node server.js
