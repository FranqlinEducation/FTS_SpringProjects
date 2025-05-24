document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

function fetchProducts() {
    fetch("http://localhost:8080/api/products")
        .then(response => response.json())
        .then(products => renderProducts(products))
        .catch(error => {
            console.error("Error fetching products:", error);
            showToast("Failed to load products", true);
        });
}

function renderProducts(products) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.imageUrl || "default-product.jpg"; // fallback image if null
        image.alt = product.name;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = `$${product.price.toFixed(2)}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.onclick = () => addToCart(product.name, product.price);

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(button);

        grid.appendChild(card);
    });
}
