const express = require("express");
const { error } = require("node:console");
const router = express.Router();
const Product = require("./productschema");


async function checkStock(request, response, next){
    try {
        let selectedProduct = await Product.findById(request.params.id);

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
    } catch (error) {
        next(error)
    }
}



router.get("/", async (request, response, next) => {
    try {
        let products = await Product.find();
        response.json(products);
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (request, response, next) =>{
    try {
        let product = await Product.findById(request.params.id);

        if(!product){
            let error = new Error("Product not found")
            error.statusCode = 404;
            return next(error)
        }

        response.json(product);
    } catch (error) {
        next(error);
    }
})


router.post("/", async (request, response, next) => {
    try {

    let newProduct = new Product({
        name: request.body.name,
        price: request.body.price,
        category: request.body.category,
        inStock: request.body.inStock

    })
    let savedProduct = await newProduct.save();


    response.status(201).json(savedProduct)

    } catch (error) {
        next(error)
    }
})

router.put("/:id", async (request, response, next) => {
    try {
        
    let updateProduct = await Product.findByIdAndUpdate(request.params.id, ({
        name: request.body.name,
        price: request.body.price,
        category: request.body.category,
        inStock: request.body.inStock
    }), {new: true});

    if(!updateProduct){
        let error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    response.status(200).json(updateProduct);

    } catch (error) {
        next(error);
    }
})

router.delete("/:id", checkStock, async (request, response, next) => {
    try {
        
    let deletedProduct = await Product.findByIdAndDelete(request.params.id);

    if(!deletedProduct){
        let error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
    }

    response.status(200).json({message: `Product deleted`});

    } catch (error) {
        next(error);
    }
})


module.exports = router;