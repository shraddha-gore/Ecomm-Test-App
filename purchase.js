import { showToast } from "./showToast";

let content = '';

export const purchase = () => {
    // Reset local storage variables
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('cartTotal', 0);
    localStorage.setItem('subtotal', 0);
    localStorage.setItem('discount', 0);
    localStorage.setItem('selectedOffer', JSON.stringify({}));
    localStorage.setItem('coupon', '');

    // Show toast
    content = `Thank you for shopping with us. Your order has been placed. <i class="fa-solid fa-check"></i>`;
    showToast(content);

    // Redirect to home page after a second
    setTimeout(() => {
        window.location = 'index.html';
    }, 1000);
};