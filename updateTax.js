// Update tax
export const updateTax = (tax) => {
    tax = Number(tax);

    // Update in UI
    document.querySelector('.productTax').innerText = `$${tax}`;

    // Update in LS
    localStorage.setItem('tax', tax);
};