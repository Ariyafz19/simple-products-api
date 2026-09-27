# Products API — Full-Stack CRUD Project

A full-stack product management app built as part of my self-taught journey into web development. It lets you view, add, update, and delete products, with all data persisted in a real MongoDB database.

> **Note:** I'm a self-taught developer learning with the help of AI (Claude). The backend logic, frontend JavaScript, and overall architecture were written and debugged by me through a guided, question-and-answer style of learning — the AI explained concepts and asked me to solve problems myself rather than handing me finished code. The CSS styling in this project was written by AI.

## What it does

- View all products in a clean, responsive card grid
- Add a new product through a form (name, price, category, stock status)
- Toggle a product's stock status with one click
- Delete a product — with a business rule that blocks deleting products still in stock
- Fully responsive layout that adapts from desktop down to mobile

## Tech stack

**Backend**
- Node.js + Express.js
- MongoDB Atlas with Mongoose (schema, model, CRUD operations)
- Centralized error-handling middleware
- Custom middleware (e.g. blocking deletion of in-stock products)
- `dotenv` for keeping the database connection string out of source code
- `cors` for allowing the frontend to communicate with the API

**Frontend**
- Vanilla HTML, CSS, and JavaScript (no frameworks)
- `fetch` API for all communication with the backend (GET, POST, PATCH, DELETE)
- Event delegation for handling dynamically rendered buttons
- Google Fonts (Inter)

## Project structure

```
product-api/
├── backend/
│   ├── server.js
│   ├── productsRoutes.js
│   ├── productschema.js
│   ├── .env              (not committed — holds the MongoDB connection string)
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

## Running it locally

**Backend:**
```bash
cd backend
npm install
node server.js
```
The API runs on `http://localhost:3000`.

**Frontend:**
Open `frontend/index.html` with a tool like Live Server (or any local static server). Make sure the backend is running first, since the frontend fetches data from it directly.

## What I learned building this

This project was where I connected everything I'd learned separately — Express routing, middleware, MongoDB/Mongoose, async JavaScript, and DOM manipulation — into one working full-stack app. Along the way I debugged real issues on my own, including a CORS error, a MongoDB update bug that was silently wiping other fields, a stuck toggle button caused by comparing strings instead of booleans, and a `.env` file not loading because of how Node resolves relative paths.