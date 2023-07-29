import { productListArray } from "/data.js";



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
                <button class="btn-add-product">+</button>
            
            </div>
        `
        
    })

    return productListHtml;
}


function renderProductList() {
    document.getElementById('product-list').innerHTML = getProductListHtml()
}

renderProductList();

