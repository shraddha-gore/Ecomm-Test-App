import { getCartFromLS } from "./getCartFromLS";

// Update cart count
export const updateCartCount = () => {
    const arrLocalStorageCart = getCartFromLS();
    let cartCount = arrLocalStorageCart.length;

    document.getElementById('cartCount').innerHTML = `<i class="fa-solid fa-cart-shopping"></i>${cartCount}`;
};