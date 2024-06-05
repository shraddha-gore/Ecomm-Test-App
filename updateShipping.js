// Update shipping
export const updateShipping = (shipping) => {
    shipping = Number(shipping);

    // Update in UI
    document.querySelector('.productShipping').innerText = `$${shipping}`;

    // Update in LS
    localStorage.setItem('shipping', shipping);
};