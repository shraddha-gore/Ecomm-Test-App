// Update discount
export const updateDiscount = (discount) => {
    discount = Number(discount);

    // Update in UI
    document.querySelector('.productDiscount').innerText = `-$${discount}`;

    // Update in LS
    localStorage.setItem('discount', discount);
};