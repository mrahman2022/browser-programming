# AI-Assisted Full-Stack Notes App

## Overview
This project is a simple full-stack notes application.

Users can:
- add notes
- view all notes
- delete notes

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: Supabase Postgres
- Deployment: Render + Vercel

## Project Structure
- `frontend/` contains the UI
- `backend/` contains the API server

## Backend API
- `GET /api/notes` → get all notes
- `POST /api/notes` → create a new note
- `DELETE /api/notes/:id` → delete a note

## Database
The app uses a `notes` table in Supabase with:
- `id`
- `title`
- `content`
- `created_at`

## Local Run

### Backend

    cd backend
    npm install
    node server.js

### Frontend

Open `frontend/index.html` in the browser.

## Screenshots

![Backend running](https://github.com/user-attachments/assets/57445a6d-ec74-49bb-949e-db1b775cce77)

![API test](https://github.com/user-attachments/assets/4e98e413-f3af-4fe2-a5fa-aa7ce7f87487)

![Notes app](https://github.com/user-attachments/assets/66f6020a-1b55-420c-96db-b3d1f7639eb1)

## Minimum Working Features
- Add note
- View notes
- Delete note
- Notes are stored in Supabase

## Reflection
We need a backend because the browser mainly handles the user interface, while the backend provides data and server-side logic. The backend can process requests, connect to a database, and return structured data to the frontend.
