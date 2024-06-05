export const checkoutToggle = () => {
    var subtotal = Number(localStorage.getItem('subtotal'));
    var checkout = document.getElementById('checkout');

    if (subtotal > 0) {
        checkout.href = 'checkout.html';
    }
    else {
        checkout.href = 'javascript:;';
    }
};