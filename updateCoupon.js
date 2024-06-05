// Update coupon
export const updateCoupon = (coupon) => {
    coupon = String(coupon);

    // Update in UI
    document.querySelector('#coupon').value = coupon;

    // Update in LS
    localStorage.setItem('coupon', coupon);
};