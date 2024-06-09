class Product {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    showDetails() {
        return `
        <div class="card">
            <img src="https://via.placeholder.com/150" class="card-img-top" alt="${this.name}">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.description}</p>
                <p class="card-text"><strong>Price:</strong> $${this.price.toFixed(2)}</p>
                <a href="#" class="btn add-to-cart">In den Warenkorb</a>
            </div>
        </div>
        `;
    }
}

const allProducts = [
    new Product("Produkt 1", "Beschreibung des Produkts 1", 15.00),
    new Product("Produkt 2", "Beschreibung des Produkts 2", 25.00),
    new Product("Produkt 3", "Beschreibung des Produkts 3", 35.00)
];

class ShoppingCart {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.products.push(product);
                resolve();
            }, 500); // Simuliert einen WebService Call mit 0.5s Verzögerung
        });
    }

    calculateTotal() {
        return this.products.reduce((total, product) => total + product.price, 0).toFixed(2);
    }
}

const cart = new ShoppingCart();

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Vorhandenen Inhalt löschen

    allProducts.forEach(product => {
        productList.innerHTML += product.showDetails();
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const productName = event.target.closest('.card-body').querySelector('.card-title').textContent;
            const product = allProducts.find(p => p.name === productName);
            if (product) {
                cart.addProduct(product).then(() => {
                    renderCart();
                });
            }
        });
    });
});

function renderCart() {
    const cartTable = document.getElementById('cart-table');
    cartTable.innerHTML = '';  // Vorhandenen Inhalt löschen

    if (cart.products.length === 0) {
        cartTable.innerHTML = '<tr><td colspan="6">Warenkorb ist leer</td></tr>';
    } else {
        cart.products.forEach((product, index) => {
            const total = product.price.toFixed(2);
            cartTable.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>1</td>
                    <td>$${total}</td>
                    <td><button class="btn btn-danger removeBtn" data-index="${index}">Entfernen</button></td>
                </tr>
            `;
        });
        document.querySelectorAll('.removeBtn').forEach(button => {
            button.addEventListener('click', event => {
                const index = event.target.dataset.index;
                cart.products.splice(index, 1);
                renderCart();
            });
        });
    }

    const totalSum = cart.calculateTotal();
    document.getElementById('total').textContent = totalSum;
}
