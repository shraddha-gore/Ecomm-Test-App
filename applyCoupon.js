import offers from './data/offers.json';
import { selectOffer } from './selectOffer';
import { showToast } from './showToast';
import { updateCartTotal } from './updateCartTotal';
import { updateCoupon } from './updateCoupon';
import { updateDiscount } from './updateDiscount';

let content = '';

// Check eligible offer & select offer
export const applyCoupon = (code) => {
    code = code.trim();

    // If code isn't blank, find mapped offer
    if (code != '') {
        var subtotal = Number(localStorage.getItem('subtotal'));
        var offer = offers.find(ele => ele.code === code);

        // Select offer only if subtotal surpasses offer threshold
        if (offer != undefined && subtotal > Number(offer.threshold.toFixed(2))) {
            var id = offer.id;
            selectOffer(id);
        }
        else {
            // Update discount
            let discount = 0;
            updateDiscount(discount);

            // Update selected offer
            selectOffer('No Offer');

            // Update coupon
            let coupon = '';
            updateCoupon(coupon);

            // Update cart total
            updateCartTotal();

            // Show toast
            content = `No such coupon. <i class="fa-solid fa-xmark"></i>`;
            showToast(content);
        }
    }
};