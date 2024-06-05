// Update subtotal
export const updateSubtotal = (subtotal) => {
    subtotal = Number(subtotal);

    // Update in UI
    document.querySelector('.productSubtotal').innerText = `$${subtotal}`;

    // Update in LS
    localStorage.setItem('subtotal', subtotal);
};