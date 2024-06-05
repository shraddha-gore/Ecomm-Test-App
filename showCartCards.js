import config from './data/siteConfig.json';
import products from './data/products.json';
import { cartQuantityToggle } from './cartQuantityToggle';
import { getCartFromLS } from "./getCartFromLS";
import { removeFromCart } from './removeFromCart';
import { updateCartTotal } from './updateCartTotal';
import { openProductPage } from './openProductPage';
import { showOffers } from './showOffers';
import { selectOffer } from './selectOffer';
import { updateTax } from './updateTax';
import { updateShipping } from './updateShipping';
import { updateDiscount } from './updateDiscount';
import { updateCartCount } from './updateCartCount';
import { applyCoupon } from './applyCoupon';

const cartElement = document.getElementById('productCartContainer');
const templateContainer = document.getElementById('productCartTemplate');
let arrLocalStorageCart = getCartFromLS();

const tax = config.tax;
const shipping = config.shipping;
let discount = Number(localStorage.getItem('discount')) != NaN ? Number(localStorage.getItem('discount')) : 0;
let selectedOffer = JSON.parse(localStorage.getItem('selectedOffer')) != null ? JSON.parse(localStorage.getItem('selectedOffer')) : {};
let coupon = String(localStorage.getItem('coupon'));

// Get products which are present in cart
let filteredCartProducts = arrLocalStorageCart.filter((cartProduct) => {
    return products.find((element) => element.id === cartProduct.id);
});

const showCart = () => {
    filteredCartProducts.forEach((cartProduct) => {
        products.forEach((originalProduct) => {
            const { id, name, category, brand, skus, price, actualPrice, description, image } = originalProduct;
            const sku = cartProduct.sku;

            if (originalProduct.id === cartProduct.id) {
                // Create a product card
                const productClone = document.importNode(templateContainer.content, true);
                productClone.querySelector('#cardValue').setAttribute('id', `card-${id}-${sku}`);
                productClone.querySelector('.productName').innerText = name;
                productClone.querySelector('.category').innerText = category;
                if (image) {
                    productClone.querySelector('.productImage').src = image;
                    productClone.querySelector('.productImage').alt = `${name}`;
                }

                productClone.querySelector('.productSKU').innerText = `${sku}`;
                productClone.querySelector('.productPrice').innerText = `$${cartProduct.price.toFixed(2)}`;
                productClone.querySelector('.productQuantity').innerText = `${cartProduct.quantity}`;

                const productQuantity = productClone.querySelector('.productQuantity');
                productQuantity.setAttribute('data-quantity', cartProduct.quantity);

                // Update product quantity
                productClone.querySelector('.quantityElement').addEventListener('click', (event) => {
                    cartQuantityToggle(event, id, sku, price);
                });

                // Remove product from cart
                productClone.querySelector('.remove-cart-button').addEventListener('click', (event) => {
                    removeFromCart(id, sku);
                });

                // Append product card to DOM
                cartElement.append(productClone);

                // Open product details page on clicking product image
                document.querySelectorAll('.productImage').forEach(el => {
                    el.addEventListener('click', (event) => {
                        // Show selected SKU
                        var id = event.target.closest('.cards').id.split('-')[1];
                        var sku = `${event.target.closest('.cards').id.split('-')[2]}-${event.target.closest('.cards').id.split('-')[3]}`;

                        openProductPage(id, sku);
                    });
                });

                // Open product details page on clicking product name
                document.querySelectorAll('.productName').forEach(el => {
                    el.addEventListener('click', (event) => {
                        // Show selected SKU
                        var id = event.target.closest('.cards').id.split('-')[1];
                        var sku = `${event.target.closest('.cards').id.split('-')[2]}-${event.target.closest('.cards').id.split('-')[3]}`;

                        openProductPage(id, sku);
                    });
                });
            }
        });
    });
};

// ---------------------------------------------------------------------------------------------------------

// Update cart count
updateCartCount();

// Update tax, shipping & discount
updateTax(tax);
updateShipping(shipping);
updateDiscount(discount);

// Display cart
showCart();

// Update cart total
updateCartTotal();

// Show eligible offers
showOffers();

// Show selected offer, coupon & apply discount
if (JSON.stringify(selectedOffer) != '{}') {
    document.getElementById('offers').value = selectedOffer.id;
    document.getElementById('coupon').value = coupon;
    updateDiscount(discount);
}

// Update cart total
updateCartTotal();

// Apply coupon
document.getElementById('coupon').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        var code = event.target.value;
        applyCoupon(code);
    }
});

// Select an offer
document.getElementById('offers').addEventListener('change', (event) => {
    var id = event.target.value;
    selectOffer(id);
});