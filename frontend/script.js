
const productContainer = document.getElementById("products-container");
const addProductForm = document.getElementById("add-product-form");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productCategory = document.getElementById("category")
const productInStock = document.getElementById("inStock")
const loginForm = document.getElementById("login-form")
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginStatus = document.getElementById("login-status");


addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");

    if(!token){
        window.alert("Please login first");
        return;
    }

    try {
        let product = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
    let token = localStorage.getItem("token");
    
    if(!token){
        window.alert("Please login first");
        return;
    }
    try {
        if(event.target.classList.contains("deleteBtn")){

            let product = await fetch(`http://localhost:3000/api/products/${event.target.dataset.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
        })
            if(!product.ok){
                let dataError = await product.json();
                window.alert(dataError.error)
            }
        }

        if(event.target.classList.contains("toggleBtn")){
            let product =  await fetch(`http://localhost:3000/api/products/${event.target.dataset.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({inStock: event.target.dataset.inStock !== "true"})
        })
            if(!product.ok){
                let errorData = await product.json();
                window.alert(errorData.error);
            }
    }

    connectAPI();
    } catch (error) {
        console.log(`Somthing went wtong: ${error}`)
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

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        let send = await fetch("http://localhost:3000/api/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: loginUsername.value,
                password: loginPassword.value
            })
        }
        )

        if(!send.ok){
            let errorData = await send.json();
            loginStatus.textContent = errorData.error;
            return;
        }

        let data = await send.json();
        localStorage.setItem("token", data.token)
        loginStatus.textContent = "Login succesful!"

    } catch (error) {
        console.log(error);
        loginStatus.textContent = error;
    }

})

connectAPI();