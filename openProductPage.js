import { updateFocusedProduct } from "./updateFocusedProduct";

// Get product ID & open product details page
export const openProductPage = (id, sku) => {
    window.location = `product.html?id=${id}`;

    // Set focused product
    var focusedProduct = { "id": id, "sku": sku };
    updateFocusedProduct(focusedProduct);
};