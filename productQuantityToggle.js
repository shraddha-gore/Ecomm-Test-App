import config from './data/siteConfig.json';
const maxQuantity = config.maxQuantity;

export const productQuantityToggle = (event, id) => {
    const productCard = document.getElementById(`card${id}`);
    const productQuantity = productCard.querySelector('.productQuantity');
    let quantity = parseInt(productQuantity.getAttribute('data-quantity')) || 1;

    // Increment quantity if it's lesser than max quantity
    if ((event.target.className === 'cartIncrement') && (quantity < maxQuantity)) { quantity++; }

    // Decrement quantity if it's greater than 1
    else if ((event.target.className === 'cartDecrement') && (quantity > 1)) { quantity--; }

    // Update quantity
    productQuantity.innerText = quantity;
    productQuantity.setAttribute('data-quantity', quantity);
};