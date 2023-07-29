import { productListArray } from "/data.js";

const productListEl = document.getElementById('product-list');
const productOrderEl = document.getElementById('product-order');
const productOrderPriceEl = document.getElementById('product-order-price');
const btnCompleteOrderEl = document.getElementById('btn-complete-order');
const modalEl = document.getElementById('modal');
const cardPaymentFormEl = document.getElementById('card-payment-form');
const orderSuccessEl = document.getElementById('order-success');

let totalProductPrice = 0;
let purchasedProducts = [];

// adding and removing products to/from the cart 
document.addEventListener('click', function(e) {
    if (e.target.dataset.product) {
        if (productOrderEl.classList.contains('hidden')) {
            productOrderEl.classList.remove('hidden');
        }
        addProductToCart(e.target.dataset.product);
    }
    else if (e.target.dataset.removeproduct) {
        removeProductFromCart(e.target.dataset.removeproduct);
    }
})

function addProductToCart(productId) {
    purchasedProducts.push(productListArray[productId]);
    totalProductPrice += productListArray[productId].price

    renderProductOrderItems(purchasedProducts);
}

function removeProductFromCart(productId) {
    purchasedProducts = purchasedProducts.filter(function(product) {
        return product.id != productId;
    })
    if (purchasedProducts.length === 0) {
        productOrderEl.classList.add('hidden');
    }
    totalProductPrice -= productListArray[productId].price
    
    renderProductOrderItems(purchasedProducts);
}

function renderProductOrderItems(purchasedProducts) {
    productOrderPriceEl.textContent = `${totalProductPrice}€`
    document.getElementById('product-order-items').innerHTML = getProductOrderHtml(purchasedProducts);
}

function getProductOrderHtml(purchasedProducts) {
    let productOrderHtml = ``
    purchasedProducts.forEach(function(product) {
        productOrderHtml += `    
            <div class="product-order-item">
                <h3 class="product-order-name">${product.name}</h3>
                <button class="product-order-remove" data-removeproduct="${product.id}">remove</button>
                <h4 class="product-order-price">${product.price}€</h4>
            </div>
        `;
    })
    
    return productOrderHtml;
}

// rendering all the products available for buying
renderProductList();

function renderProductList() {
    productListEl.innerHTML = getProductListHtml()
}

function getProductListHtml() {
    let productListHtml = ``;

    productListArray.forEach(function(product) {
        productListHtml += `
            <div class="product" id="product">
                <p class="product-image">${product.emoji}</p>
                <div class="product-description">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <h4>${product.price}€</h4>
                </div>
                <button class="btn-add-product" id="btn-add-product" data-product="${product.id}">+</button>
            
            </div>
        ` 
    })

    return productListHtml;
}

// processing to payment
btnCompleteOrderEl.addEventListener('click', function() {
    modalEl.classList.remove('hidden');
})

cardPaymentFormEl.addEventListener('submit', function(e) {
    e.preventDefault();

    const paymentFormData = new FormData(cardPaymentFormEl)
    const cardName = paymentFormData.get('card-name')

    modalEl.classList.add('hidden');
    productOrderEl.classList.add('hidden');
    orderSuccessEl.classList.remove('hidden');
})