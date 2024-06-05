import { getCartFromLS } from "./getCartFromLS";

// Calculate subtotal
export const calculateSubtotal = () => {
    let arrLocalStorageCart = getCartFromLS();
    let initialValue = 0;

    // Compute subtotal
    let subtotal = arrLocalStorageCart.reduce((sum, ele) => {
        let price = ele.price;
        return sum + price;
    }, initialValue);

    return Number(subtotal.toFixed(2));
};