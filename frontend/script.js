
const productContainer = document.getElementById("products-container");
const addProductForm = document.getElementById("add-product-form");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productCategory = document.getElementById("category")
const productInStock = document.getElementById("inStock")


addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        let product = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: productName.value , 
                price: productPrice.value , 
                category: productCategory.value, 
                inStock: productInStock.checked? true: false 
            })
        })

        addProductForm.reset();
        connectAPI();
    } catch (error) {
        console.log(error)
    }
})


function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach((product) =>{
        let productElement = document.createElement("div");
        productElement.className = "products";
        productElement.innerHTML = ` 
        <p class="product-name">${product.name}</p>
        <p class="product-price">$${product.price}</p>
        <p class="product-category">${product.category}</p>
        <p class="product-inStock ${product.inStock? "in-stock": "out-of-stock"}">${product.inStock? `Yes`: `No`}</p>
        <div class="card-actions">
            <button type="button" class="toggleBtn" data-id="${product._id}" data-in-stock="${product.inStock}">Toggle stock</button>
            <button type="button" class="deleteBtn" data-id="${product._id}">Delete</button>
        </div>
        `

    productContainer.appendChild(productElement)
    })
}

productContainer.addEventListener("click", async (event) => {

    try {
        if(event.target.classList.contains("deleteBtn")){

            let product = await fetch(`http://localhost:3000/api/products/${event.target.dataset.id}`, {
                method: "DELETE"
        })
            if(!product.ok){
                let dataError = await product.json();
                window.alert(dataError.error)
            }
        connectAPI();
        }
    } catch (error) {
        console.log(`Somthing went wtong: ${error}`)
    }
    
})

productContainer.addEventListener("click", async (event) =>{
    try {
        if(event.target.classList.contains("toggleBtn")){
            let product =  await fetch(`http://localhost:3000/api/products/${event.target.dataset.id}`,{
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({inStock: event.target.dataset.inStock !== "true"})
        })
            if(!product.ok){
                let errorData = await product.json();
                window.alert(errorData.error);
            }
            connectAPI();
    }
    } catch (error) {
        console.log(`Somthing went wrong: ${error}`)
    }
})



async function connectAPI() {
    try {
        let result = await fetch("http://localhost:3000/api/products")
        let finalResult =  await result.json();
        return displayProducts(finalResult)
    } catch (error) {
        console.log(`Somthing went wrong ${error}`)
    }
}

connectAPI();