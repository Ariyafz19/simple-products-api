# Simple Products API

A simple RESTful API for managing products, built with **Express.js**.
This project was built from scratch as an independent practice project after learning Express fundamentals: routing, middleware, and centralized error handling.

## Features

- Full CRUD for products (Create, Read, Update, Delete)
- Clean file structure using `express.Router()` (routes separated from the server file)
- Custom logging middleware — logs every incoming request
- Centralized error-handling middleware
- Custom `checkStock` middleware — only allows deleting a product if it is **out of stock** (`inStock: false`)
  - Returns `404` if the product doesn't exist
  - Returns `400` if the product is still in stock
- Added real database connection

## Tech Stack

- Node.js
- Express.js
- MongoDB (Database)

## Project Structure

```
simple-products-api/
├── server.js          # App entry point, middleware setup
├── productsRoutes.js  # Product routes (Router)
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine

### Installation

```bash
git clone https://github.com/Ariyafz19/simple-products-api.git
cd simple-products-api
npm install
```

### Run the server

```bash
node server.js
```

Or, with `nodemon` (if installed):

```bash
nodemon server.js
```

The server will start on `http://localhost:3000` (adjust if your port is different).

## API Endpoints

| Method | Endpoint             | Description                          |
|--------|-----------------------|---------------------------------------|
| GET    | `/products`           | Get all products                     |
| GET    | `/products/:id`       | Get a single product by ID           |
| POST   | `/products`           | Create a new product                 |
| PUT    | `/products/:id`       | Update an existing product           |
| DELETE | `/products/:id`       | Delete a product (only if `inStock: false`) |

### Example: Create a product

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Keyboard", "price": 45, "inStock": true}'
```

### Example: Delete a product

```bash
curl -X DELETE http://localhost:3000/products/1
```

- Returns `400` if the product is still in stock (`inStock: true`)
- Returns `404` if no product with that ID exists
- Returns `200` if the product was deleted successfully

## Notes

Data is currently stored in memory and resets whenever the server restarts. A future improvement is connecting the API to a real database.

## Author

Built by [Ariyafz19](https://github.com/Ariyafz19) as part of a self-taught journey toward becoming a web developer.
