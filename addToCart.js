import config from './data/siteConfig.json';
import { getCartFromLS } from "./getCartFromLS";
import { getProductFromJSON } from "./getProductFromJSON";
import { getProductFromLS } from "./getProductFromLS";
import { showToast } from "./showToast";
import { updateCartCount } from "./updateCartCount";

const maxQuantity = config.maxQuantity;

export const addToCart = (event, id) => {
    const originalProduct = getProductFromJSON(id);
    const productCard = document.getElementById(`card${id}`);
    const category = originalProduct.category;

    let sku = productCard.querySelector('.productSKU').innerText;
    let quantity = Number(productCard.querySelector('.productQuantity').innerText);
    let price = Number(productCard.querySelector('.productPrice').innerText.replace('$', ''));
    let arrLocalStorageCart = getCartFromLS();
    let projectedQuantity = 0;
    let content = '';

    // Compute new price
    price *= quantity;
    price = Number(price.toFixed(2));

    // Search product in cart
    const product = getProductFromLS(id, sku);

    // If product is not found, add it to the cart, else update cart
    if (!product) {
        projectedQuantity = quantity;
        arrLocalStorageCart.push({ "id": id, "sku": sku, "category": category, "price": price, "quantity": quantity });

        // Show toast
        content = `${originalProduct.name} added to cart. <i class="fa-solid fa-check"></i>`;
        showToast(content);
    }
    else {
        const cartQuantity = arrLocalStorageCart.find(ele => ele.id === id && ele.sku === sku).quantity;
        projectedQuantity = cartQuantity + quantity;

        // Update cart if projected quantity is not greater than max quantity
        if (projectedQuantity <= maxQuantity) {
            price = Number((arrLocalStorageCart.find(ele => ele.id === id && ele.sku === sku).price + price).toFixed(2));
            quantity = arrLocalStorageCart.find(ele => ele.id === id && ele.sku === sku).quantity + quantity;

            arrLocalStorageCart.find(ele => ele.id === id && ele.sku === sku).price = price;
            arrLocalStorageCart.find(ele => ele.id === id && ele.sku === sku).quantity = quantity;

            // Show toast
            content = `${originalProduct.name} added to cart. <i class="fa-solid fa-check"></i>`;
            showToast(content);
        }
        else {
            // Show toast
            content = `${originalProduct.name} not added to cart. Selected quantity exceeds ${maxQuantity}. <i class="fa-solid fa-xmark"></i>`;
            showToast(content);
        }
    }

    // Update cart & cart count
    localStorage.setItem('cart', JSON.stringify(arrLocalStorageCart));
    updateCartCount();
};