// Update focused product
export const updateFocusedProduct = (product) => {
    localStorage.setItem('focusedProduct', JSON.stringify(product));
};