# Products API — Full-Stack CRUD Project with Authentication

A full-stack product management app built as part of my self-taught journey into web development. It lets you view, add, update, and delete products, with all data persisted in a real MongoDB database, and protects sensitive actions behind JWT-based authentication.

> **Note:** I'm a self-taught developer learning with the help of AI (Claude). The backend logic, frontend JavaScript, and overall architecture were written and debugged by me through a guided, question-and-answer style of learning — the AI explained concepts and asked me to solve problems myself rather than handing me finished code. The CSS styling in this project was written by AI.

## What it does

- View all products in a clean, responsive card grid (public, no login required)
- Register an account and log in to receive a JWT
- Add a new product through a form (name, price, category, stock status) — requires login
- Toggle a product's stock status with one click — requires login
- Delete a product — requires login, and blocked by a business rule if the product is still in stock
- Fully responsive layout that adapts from desktop down to mobile

## Tech stack

**Backend**
- Node.js + Express.js
- MongoDB Atlas with Mongoose (schema, model, CRUD operations)
- Centralized error-handling middleware
- Custom `checkStock` middleware — only allows deleting a product if it is **out of stock** (`inStock: false`)
  - Returns `404` if the product doesn't exist
  - Returns `400` if the product is still in stock
<<<<<<< HEAD
- JWT authentication (`jsonwebtoken`)
  - Passwords hashed with `bcrypt` before being saved (never stored in plain text)
  - `authMiddleware` protects all POST/PATCH/DELETE product routes — GET stays public
  - Login returns a generic "Invalid username or password" error for both a wrong username and a wrong password, to avoid leaking which usernames exist
- `dotenv` for keeping the database connection string and JWT secret out of source code
- `cors` for allowing the frontend to communicate with the API
=======
- Added real database connection
- Bcrypt for password hashing
- JWT Authentication for authorizing
>>>>>>> 4c943d5370c6d04f04ff8a49bc026b79752a1125

**Frontend**
- Vanilla HTML, CSS, and JavaScript (no frameworks)
- `fetch` API for all communication with the backend (GET, POST, PATCH, DELETE)
- Login form that stores the received JWT in `localStorage`
- Protected requests automatically attach the token via an `Authorization: Bearer <token>` header
- Event delegation for handling dynamically rendered buttons
- Google Fonts (Inter)

## Project structure

```
product-api/
├── backend/
│   ├── server.js
│   ├── productsRoutes.js
│   ├── productschema.js
│   ├── authRoutes.js
│   ├── userschema.js
│   ├── authMiddleware.js
│   ├── .env              (not committed — holds the Mongo connection string and JWT secret)
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

## API Endpoints

| Method | Endpoint              | Auth required | Description                          |
| ------ | ---------------------- | -------------- | ------------------------------------- |
| GET    | `/api/products`        | No             | Get all products                      |
| POST   | `/api/products`        | Yes            | Create a new product                  |
| PATCH  | `/api/products/:id`    | Yes            | Update a product (e.g. toggle stock)  |
| DELETE | `/api/products/:id`    | Yes            | Delete a product (blocked if in stock)|
| POST   | `/api/auth/register`   | No             | Create a new user account             |
| POST   | `/api/auth/login`      | No             | Log in and receive a JWT              |

## Running it locally

**Backend:**
```bash
cd backend
npm install
node server.js
```
The API runs on `http://localhost:3000`.

You'll need a `.env` file inside `backend/` with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret_string
```

**Frontend:**
Open `frontend/index.html` with a tool like Live Server (or any local static server). Make sure the backend is running first, since the frontend fetches data from it directly. Register an account and log in through the UI to unlock adding, toggling, and deleting products.

## What I learned building this

This project is where I connected everything I'd learned separately — Express routing, middleware, MongoDB/Mongoose, async JavaScript, DOM manipulation, and authentication — into one working full-stack app. Along the way I debugged real issues on my own, including a CORS error, a MongoDB update bug that was silently wiping other fields, a stuck toggle button caused by comparing strings instead of booleans, a `.env` file not loading because of how Node resolves relative paths, and several JWT/middleware bugs (a `next()` called without `return`, a missing `try/catch` around `jwt.verify`, and a stale token caused by reading `localStorage` only once instead of on every request).