# First Backend API Assignment

## What I implemented
- Created a backend server using Express
- Added a root route `/` that returns a simple text message
- Added `/api/message` that returns JSON with message, course, and year
- Added `/api/student` that returns JSON with student name and role
- Built a simple frontend with buttons to fetch data from the backend
- Used `fetch()` in the browser to call the API and display the result
- Enabled CORS so the frontend can access the backend

## Files included
- `server.js`
- `index.html`
- `script.js`

## How to run
1. Open terminal in the project folder
2. Install dependencies:
   `npm install express cors`
3. Start the server:
   `node server.js`
4. Open `index.html` in the browser
5. Click the buttons to test the API

## API routes
- `/`
- `/api/message`
- `/api/student`

## Reflection
We need a backend because the browser mainly handles the user interface, while the backend provides data and server-side logic. The backend can create APIs, process requests, and send structured data to the frontend.
