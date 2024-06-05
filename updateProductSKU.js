import { getSKUFromProductColour } from "./getSKUFromProductColour";
import { updateFocusedProduct } from "./updateFocusedProduct";

// Construct & set SKU
export const setProductSKU = (id, colour) => {
    var sku = getSKUFromProductColour(id, colour);
    var focusedProduct = JSON.parse(localStorage.getItem('focusedProduct'));

    // Set SKU in UI & BE both
    document.querySelector('.productSKU').innerText = sku;

    focusedProduct.id = id;
    focusedProduct.sku = sku;
    updateFocusedProduct(focusedProduct);
};