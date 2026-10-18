const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors")
const app = express();
const productsRoutes = require("./productsRoutes");
const authRoutes = require("./authRoutes");


app.use(express.json())
app.use(cors({
    origin: ["https://ariyafz19.github.io", "http://localhost:5500", "http://127.0.0.1:5500"]
}
))

app.use((request, response, next) =>{
    console.log(`${request.method} - ${request.url}`)
    next();
})

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

app.use((error, request, response, next) => {
    if (error.name === "ValidationError"){ 

        error.statusCode = 400; 
    }
    let statusCode = error.statusCode || 500;
    response.status(statusCode).json({ error: error.message });
})

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running on port 3000!")
})