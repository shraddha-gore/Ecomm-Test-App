import { getCartFromLS } from "./getCartFromLS";
import { purchase } from "./purchase";
import { updateCartCount } from "./updateCartCount";

// Update cart count
updateCartCount();

const arrLocalStorageCart = getCartFromLS();
let cartCount = arrLocalStorageCart.length;

var tabLink = document.getElementsByClassName('tabLink');
var tabContent = document.getElementsByClassName('tabContent');

// Show checkout page only if cart is not empty
if (cartCount > 0) {
    // Open Shipping tab by default
    document.getElementById('shipping').className += ' active';
    document.getElementById('shippingContent').style.display = 'block';

    // Shipping: Show next tab
    document.getElementById('shippingContent').addEventListener('click', (event) => {
        let name = document.getElementById('name');
        let add1 = document.getElementById('add1');

        if (event.target.id === 'shippingNext' && name.value != '' && add1.value != '') {
            // Hide content of the other tabs
            for (i = 0; i < tabLink.length; i++) {
                tabLink[i].className = tabLink[i].className.replace(' active', '');
            }
            for (var i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = 'none';
            }

            // Activate Billing tab
            document.getElementById('billing').className += ' active';
            document.getElementById('billingContent').style.display = 'block';
        }
    });

    // Billing: Show previous / next tab
    document.getElementById('billingContent').addEventListener('click', (event) => {
        if (event.target.id === 'billingNext') {
            // Hide content of the other tabs
            for (i = 0; i < tabLink.length; i++) {
                tabLink[i].className = tabLink[i].className.replace(' active', '');
            }
            for (var i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = 'none';
            }

            // Activate Review tab
            document.getElementById('review').className += ' active';
            document.getElementById('reviewContent').style.display = 'block';
        }
        else if (event.target.id === 'billingPrevious') {
            // Hide content of the other tabs
            for (i = 0; i < tabLink.length; i++) {
                tabLink[i].className = tabLink[i].className.replace(' active', '');
            }
            for (var i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = 'none';
            }

            // Activate Shipping tab
            document.getElementById('shipping').className += ' active';
            document.getElementById('shippingContent').style.display = 'block';
        }
    });

    // Review: Show previous tab
    document.getElementById('reviewContent').addEventListener('click', (event) => {
        if (event.target.id === 'reviewPrevious') {
            // Hide content of the other tabs
            for (i = 0; i < tabLink.length; i++) {
                tabLink[i].className = tabLink[i].className.replace(' active', '');
            }
            for (var i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = 'none';
            }

            // Activate Billing tab
            document.getElementById('billing').className += ' active';
            document.getElementById('billingContent').style.display = 'block';
        }
    });

    // Review: Show previous tab
    document.getElementById('reviewContent').addEventListener('click', (event) => {
        if (event.target.id === 'reviewPrevious') {
            // Hide content of the other tabs
            for (i = 0; i < tabLink.length; i++) {
                tabLink[i].className = tabLink[i].className.replace(' active', '');
            }
            for (var i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = 'none';
            }

            // Activate Billing tab
            document.getElementById('billing').className += ' active';
            document.getElementById('billingContent').style.display = 'block';
        }
    });

    // Fill Review tab content
    const subtotal = Number(localStorage.getItem('subtotal'));
    const discount = Number(localStorage.getItem('discount'));
    const shipping = Number(localStorage.getItem('shipping'));
    const tax = Number(localStorage.getItem('tax'));
    const cartTotal = Number(localStorage.getItem('cartTotal'));

    document.querySelector('.productSubtotal').innerText = `$${subtotal}`;
    document.querySelector('.productDiscount').innerText = `-$${discount}`;
    document.querySelector('.productShipping').innerText = `$${shipping}`;
    document.querySelector('.productTax').innerText = `$${tax}`;
    document.querySelector('.productFinalTotal').innerText = `$${cartTotal}`;

    // Make a purchase
    document.getElementById('purchase').addEventListener('click', (event) => {
        purchase();
    });
}
// Redirect to the cart page if cart is empty
else {
    window.location = 'cart.html';
}