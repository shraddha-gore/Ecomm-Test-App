export const getCartFromLS = () => {
    let cart = localStorage.getItem('cart');

    // If cart is not present, point cart to an empty array
    if (!cart) {
        cart = [];
    }
    else {
        cart = JSON.parse(cart);
    }

    // Return cart object
    return cart;
};