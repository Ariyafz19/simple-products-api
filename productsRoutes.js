const express = require("express");
const { error } = require("node:console");
const router = express.Router();

let products = [
  { id: 1, name: "Laptop", price: 25000000, category: "Electronics", inStock: true },
  { id: 2, name: "Old Phone", price: 3000000, category: "Electronics", inStock: false },
  { id: 3, name: "Desk Chair", price: 4500000, category: "Furniture", inStock: true }
];
let nextId = 4;

function checkStock(request, response, next){
    let id = Number(request.params.id);
    let selectedProduct = products.find((product) => product.id === id);

    if(!selectedProduct){
        let error = new Error("Product not found!")
        error.statusCode = 404;
        return next(error);
    }

    if(selectedProduct.inStock === true){
        let error = new Error("Cannot delete a product that is in stock!")
        error.statusCode = 400;
        return next(error);
    }

    next();
}



router.get("/", (request, response, next) => {
    response.json(products)
})

router.get("/:id", (request, response, next) =>{
    let id = Number(request.params.id);
    let selectedProduct = products.find((product) => product.id === id);

    if(!selectedProduct){
        let error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    response.json(selectedProduct);
})

router.post("/", (request, response, next) => {
    let product = {
        id: nextId,
        name: request.body.name,
        price: request.body.price,
        category: request.body.category,
        inStock: request.body.inStock
    }

    products.push(product);
    nextId++;

    response.status(201).json({message: "Product has been added"})
})

router.put("/:id", (request, response, next) => {
    let id = Number(request.params.id);
    let updateProduct = products.find((product) => product.id === id);

    if(!updateProduct){
        let error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }
    updateProduct.name = request.body.name
    updateProduct.price = request.body.price
    updateProduct.category = request.body.category
    updateProduct.inStock = request.body.inStock

    response.status(200).json({message: "Product updated"});
})

router.delete("/:id", checkStock,(request, response, next) => {
    let id = Number(request.params.id);
    let productIndex = products.findIndex((product) => product.id === id);

    if(productIndex === -1){
        let error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    products.splice(productIndex, 1);
    response.status(200).json({message: "Product deleted"})
})


module.exports = router;