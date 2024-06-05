import config from './data/siteConfig.json';
import { getCartFromLS } from "./getCartFromLS";
import { getProductFromLS } from "./getProductFromLS";
import { showOffers } from './showOffers';
import { showToast } from './showToast';
import { updateCartTotal } from "./updateCartTotal";
import { updateCoupon } from './updateCoupon';
import { updateDiscount } from './updateDiscount';
import { updateSelectedOffer } from './updateSelectedOffer';

const maxQuantity = config.maxQuantity;

export const cartQuantityToggle = (event, id, sku, price) => {
    const productCard = document.getElementById(`card-${id}-${sku}`);
    const productQuantity = productCard.querySelector('.productQuantity');
    const productPrice = productCard.querySelector('.productPrice');

    let arrLocalStorageCart = getCartFromLS();
    let product = getProductFromLS(id, sku);
    let quantity = product.quantity;
    let updatedPrice = 0;
    let content = '';

    // Increment quantity if it's lesser than max quantity
    if ((event.target.className === 'cartIncrement') && (quantity < maxQuantity)) {
        quantity++;
    }

    // Decrement quantity if it's greater than 1
    else if ((event.target.className === 'cartDecrement') && (quantity > 1)) {
        quantity--;
    }

    // Compute new price
    updatedPrice = price * quantity;
    updatedPrice = Number(updatedPrice.toFixed(2));

    // Update cart
    arrLocalStorageCart.find(x => x.id === id && x.sku === sku).price = updatedPrice;
    arrLocalStorageCart.find(x => x.id === id && x.sku === sku).quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(arrLocalStorageCart));

    // Update quantity
    productQuantity.innerText = quantity;
    productQuantity.setAttribute('data-quantity', quantity);

    // Update price
    productPrice.innerText = `$${updatedPrice}`;

    // Remove selected offer & discount and show toast
    let selectedOffer = JSON.parse(localStorage.getItem('selectedOffer')) != null ? JSON.parse(localStorage.getItem('selectedOffer')) : {};

    if (JSON.stringify(selectedOffer) != '{}') {
        updateSelectedOffer({});
        updateDiscount(0);
        updateCoupon('');
        content = `Offer auto-removed. <i class="fa-solid fa-check"></i>`;
        showToast(content);
    }

    // Update cart total
    updateCartTotal();

    // Show eligible offers
    showOffers();
};