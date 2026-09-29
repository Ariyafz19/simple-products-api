const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors")
const app = express();
const productsRoutes = require("./productsRoutes");
const authRoutes = require("./authRoutes");


app.use(express.json())
app.use(cors())

app.use((request, response, next) =>{
    console.log(`${request.method} - ${request.url}`)
    next();
})

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

app.use((error, request, response, next) => {
    let statusCode = error.statusCode || 500;
    response.status(statusCode).json({ error: error.message });
})

app.listen(3000, () =>{
    console.log("Server is running on port 3000!")
})