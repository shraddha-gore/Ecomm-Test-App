const productContainer = document.getElementById('productContainer');
const productTemplate = document.getElementById('productTemplate');

export const showProductContainer = (products) => {
    if (!products) { return false; }

    // Clear existing products
    productContainer.innerHTML = '';

    // Iterate over products & create a card for each product
    products.forEach((product) => {
        const { id, name, category, brand, colours, price, actualPrice, description, image } = product;

        // Create a product card
        const productClone = document.importNode(productTemplate.content, true);
        productClone.querySelector('#cardValue').setAttribute('id', `card${id}`);
        productClone.querySelector('.productName').innerText = name;
        productClone.querySelector('.category').innerText = category;
        productClone.querySelector('.productDescription').innerText = description;
        productClone.querySelector('.productPrice').innerText = `$${price}`;
        productClone.querySelector('.productActualPrice').innerText = `$${actualPrice}`;
        if (image) {
            productClone.querySelector('.productImage').src = image;
            productClone.querySelector('.productImage').alt = `${name}`;
        }

        // Append product card to DOM
        productContainer.append(productClone);
    });
};