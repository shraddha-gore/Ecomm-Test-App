import { getCartFromLS } from "./getCartFromLS";

// Find and return cart product
export const getProductFromLS = (id, sku) => {
    const arrLocalStorageCart = getCartFromLS();
    const cartProduct = arrLocalStorageCart.find(ele => ele.id === id && ele.sku === sku);

    return cartProduct;
};