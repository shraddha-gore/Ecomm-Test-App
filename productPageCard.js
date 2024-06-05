import { addToCart } from "./addToCart";
import { getProductFromJSON } from "./getProductFromJSON";
import { productQuantityToggle } from "./productQuantityToggle";
import { updateCartCount } from "./updateCartCount";
import { updateFocusedProduct } from "./updateFocusedProduct";
import { setProductSKU } from "./updateProductSKU";

const productContainer = document.getElementById('productContainer');
const productTemplate = document.getElementById('productTemplate');

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

export const showProductContainer = (productId) => {
    // Get product
    var product = getProductFromJSON(productId);
    if (!product) { return false; }

    // Get focused product
    var focusedProduct = JSON.parse(localStorage.getItem('focusedProduct'));

    // Update focused product if user explicitly navigated via Products URL
    if (focusedProduct.id != product.id) {
        focusedProduct.id = product.id;
        focusedProduct.sku = product.skus[0].id;
        updateFocusedProduct(focusedProduct);
    }

    // Clear existing product
    productContainer.innerHTML = '';

    // Create a card for product
    const { id, name, category, brand, skus, price, actualPrice, description, image } = product;

    // Create a product card
    const productClone = document.importNode(productTemplate.content, true);
    productClone.querySelector('#cardValue').setAttribute('id', `card${id}`);
    productClone.querySelector('.productName').innerText = name;
    productClone.querySelector('.category').innerText = category;
    productClone.querySelector('.productSKU').innerText = `${focusedProduct.sku}`;
    productClone.querySelector('.productDescription').innerText = description;
    productClone.querySelector('.productPrice').innerText = `$${price}`;
    productClone.querySelector('.productActualPrice').innerText = `$${actualPrice}`;
    if (image) {
        productClone.querySelector('.productImage').src = image;
        productClone.querySelector('.productImage').alt = `${name}`;
    }
    skus.forEach((sku) => {
        let option = document.createElement("option");

        option.value = sku.colour;
        option.innerText = sku.colour;

        productClone.querySelector('.productColour').appendChild(option);
    });

    // Update product quantity
    productClone.querySelector('.quantityElement').addEventListener('click', (event) => {
        productQuantityToggle(event, id);
    });

    // Add product to cart
    productClone.querySelector('.add-to-cart-button').addEventListener('click', (event) => {
        addToCart(event, id);
    });

    // Update product SKU on colour selection
    productClone.querySelector('.productColour').addEventListener('change', (event) => {
        var colour = event.target.value;
        setProductSKU(id, colour);
    });

    // Append product card to DOM
    productContainer.append(productClone);
};

// ---------------------------------------------------------------------------------------------------------

// Update cart count
updateCartCount();

// Display product
showProductContainer(id);

// Clear focused product before user exits the page
window.addEventListener('beforeunload', (event) => {
    updateFocusedProduct({});
});