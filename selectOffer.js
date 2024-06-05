import offers from './data/offers.json';
import { showToast } from './showToast';
import { updateCartTotal } from './updateCartTotal';
import { updateCoupon } from './updateCoupon';
import { updateDiscount } from './updateDiscount';
import { updateSelectedOffer } from './updateSelectedOffer';

export const selectOffer = (id) => {
    var selectedOffer = offers.find(ele => ele.id === id);
    var subtotal = Number(localStorage.getItem('subtotal'));

    if (selectedOffer != undefined) {
        if (selectedOffer.type === 'percent') {
            // Compute & update discount
            let discount = Number(((selectedOffer.value / 100) * subtotal).toFixed(2));
            updateDiscount(discount);

            // Update selected offer
            updateSelectedOffer(selectedOffer);

            // Update coupon
            let coupon = selectedOffer.code;
            updateCoupon(coupon);

            // Show toast
            let content = `Applied coupon ${coupon}. <i class="fa-solid fa-check"></i>`;
            showToast(content);
        }
        else {
            // Compute & update discount
            let discount = Number(selectedOffer.value.toFixed(2));
            updateDiscount(discount);

            // Update selected offer
            updateSelectedOffer(selectedOffer);

            // Update coupon
            let coupon = selectedOffer.code;
            updateCoupon(coupon);

            // Show toast
            let content = `Applied coupon ${coupon}. <i class="fa-solid fa-check"></i>`;
            showToast(content);
        }
    }
    else {
        // Update discount
        let discount = 0;
        updateDiscount(discount);

        // Update selected offer
        updateSelectedOffer({});

        // Update coupon
        let coupon = '';
        updateCoupon(coupon);

        // Show toast
        let content = `No coupon applied. <i class="fa-solid fa-check"></i>`;
        showToast(content);
    }

    // Update cart total
    updateCartTotal();
};