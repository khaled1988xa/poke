// Klasse Product
class Product {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    showDetails() {
        return `
            <div class="card mb-3" style="width: 18rem;">
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="${this.name}">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">${this.description}</p>
                    <p class="card-text"><strong>Preis: €${this.price.toFixed(2)}</strong></p>
                    <button class="btn btn-primary add-to-cart" data-name="${this.name}">Hinzufügen</button>
                </div>
            </div>
        `;
    }
}

// Array für alle Produkte
const allProducts = [
    new Product('Produkt 1', 'Beschreibung von Produkt 1', 10.99),
    new Product('Produkt 2', 'Beschreibung von Produkt 2', 20.99),
    new Product('Produkt 3', 'Beschreibung von Produkt 3', 30.99)
];

// Klasse ShoppingCart
class ShoppingCart {
    constructor() {
        this.products = [];
    }

    calculateTotal() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }

    addProduct(product) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.products.push(product);
                resolve();
            }, 500); // Simuliert einen WebService Call
        });
    }

    removeProduct(productName) {
        this.products = this.products.filter(product => product.name !== productName);
    }
}

// Instanz des Warenkorbs
const shoppingCart = new ShoppingCart();

// Funktion zum Anzeigen aller Produkte
function displayAllProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    allProducts.forEach(product => {
        productsContainer.innerHTML += product.showDetails();
    });
}

// Funktion zum Anzeigen des Warenkorbs
function renderCart() {
    const cartContainer = document.getElementById('shoppingCart');
    cartContainer.innerHTML = '';
    shoppingCart.products.forEach(product => {
        cartContainer.innerHTML += `
            <div class="card mb-3" style="width: 18rem;">
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Preis: €${product.price.toFixed(2)}</strong></p>
                    <button class="btn btn-danger remove-from-cart" data-name="${product.name}">Entfernen</button>
                </div>
            </div>
        `;
    });
    document.getElementById('totalPrice').innerText = `Gesamtpreis: €${shoppingCart.calculateTotal().toFixed(2)}`;
}

// EventListener für "Hinzufügen"-Buttons
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productName = event.target.getAttribute('data-name');
        const product = allProducts.find(prod => prod.name === productName);
        await shoppingCart.addProduct(product);
        renderCart();
    }

    if (event.target.classList.contains('remove-from-cart')) {
        const productName = event.target.getAttribute('data-name');
        shoppingCart.removeProduct(productName);
        renderCart();
    }
});

// Produkte beim Laden der Seite anzeigen
document.addEventListener('DOMContentLoaded', () => {
    displayAllProducts();
    renderCart();
});
