# Task Manager API (Practical 4 + Practical 5 merged)

Both practicals live in one project, but as separate routes so both keep working side by side.

- `/tasks` → Practical 4 — in-memory array CRUD (no database needed)
- `/mongo-tasks` → Practical 5 — MongoDB + Mongoose CRUD (needs MongoDB running)

## Setup

```
npm install
```

Make sure MongoDB is running locally, or put your Atlas connection string in `.env`:
```
MONGO_URI=mongodb://localhost:27017/taskmanager
```

## Run

```
npm start
```

Server runs on `http://localhost:5000`.
Even if MongoDB is not connected, `/tasks` (Practical 4) will still work fine —
only `/mongo-tasks` (Practical 5) needs the database.

## Testing in Postman

Practical 4 (in-memory):
- GET    http://localhost:5000/tasks
- POST   http://localhost:5000/tasks        body: { "title": "Buy milk" }
- PUT    http://localhost:5000/tasks/1      body: { "completed": true }
- DELETE http://localhost:5000/tasks/1

Practical 5 (MongoDB):
- GET    http://localhost:5000/mongo-tasks
- GET    http://localhost:5000/mongo-tasks/:id
- POST   http://localhost:5000/mongo-tasks  body: { "title": "Buy milk", "priority": "high" }
- PUT    http://localhost:5000/mongo-tasks/:id
- DELETE http://localhost:5000/mongo-tasks/:id

Remember: set header `Content-Type: application/json` on POST/PUT requests,
otherwise the `jsonValidator` middleware will reject them with a 400.
