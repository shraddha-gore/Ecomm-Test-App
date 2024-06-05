import { calculateSubtotal } from "./calculateSubtotal";
import { checkoutToggle } from "./checkoutToggle";
import { updateDiscount } from "./updateDiscount";
import { updateShipping } from "./updateShipping";
import { updateSubtotal } from "./updateSubtotal";
import { updateTax } from "./updateTax";

export const updateCartTotal = () => {
    let tax = Number(localStorage.getItem('tax'));
    let shipping = Number(localStorage.getItem('shipping'));
    let discount = Number(localStorage.getItem('discount'));

    // Compute sub total
    let subtotal = calculateSubtotal();

    // Compute cart total
    let cartTotal = Number(((subtotal + tax + shipping) - discount).toFixed(2));

    // Update tax
    updateTax(tax);

    // Update shipping
    updateShipping(shipping);

    // Update discount
    updateDiscount(discount);

    // Update sub total
    updateSubtotal(subtotal);

    // Update cart total
    document.querySelector('.productFinalTotal').innerText = `$${cartTotal}`;
    localStorage.setItem('cartTotal', cartTotal);

    // Enable checkout link only if subtotal is greater than 0
    checkoutToggle();
};