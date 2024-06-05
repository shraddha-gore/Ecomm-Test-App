import { getCartFromLS } from "./getCartFromLS";
import { getProductFromJSON } from "./getProductFromJSON";
import { showToast } from "./showToast";
import { updateCartTotal } from "./updateCartTotal";
import { updateCartCount } from "./updateCartCount";
import { showOffers } from "./showOffers";
import { updateSelectedOffer } from "./updateSelectedOffer";
import { updateDiscount } from "./updateDiscount";
import { updateCoupon } from "./updateCoupon";

export const removeFromCart = (id, sku) => {
    const originalProduct = getProductFromJSON(id);
    let arrLocalStorageCart = getCartFromLS();
    let content = '';

    // Retrieve all products except intended product
    let updatedCart = arrLocalStorageCart.filter((element) => element.sku !== sku);

    // Update cart & cart count
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount();

    // Update cards
    document.getElementById(`card-${id}-${sku}`).remove();

    // Remove selected offer, coupon & discount
    let selectedOffer = JSON.parse(localStorage.getItem('selectedOffer'));
    
    if (JSON.stringify(selectedOffer) != '{}') {
        updateSelectedOffer({});
        updateCoupon('');
        updateDiscount(0);
        content = `Removed ${originalProduct.name} removed from cart & auto-removed applied offer. <i class="fa-solid fa-check"></i>`;
    }
    else {
        content = `${originalProduct.name} removed from cart. <i class="fa-solid fa-check"></i>`;
    }

    // Update cart total
    updateCartTotal();

    // Show eligible offers
    showOffers();

    // Show toast
    showToast(content);
};