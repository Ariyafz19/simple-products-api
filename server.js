const express = require("express");
const app = express();
const productsRoutes = require("./productsRoutes");

app.use(express.json())

app.use((request, response, next) =>{
    console.log(`${request.method} - ${request.url}`)
    next();
})

app.use("/api/products", productsRoutes);

app.use((error, request, response, next) => {
    let statusCode = error.statusCode || 500;
    response.status(statusCode).json({ error: error.message });
})

app.listen(3000, () =>{
    console.log("Server is running on port 3000 boss!")
})