// import './style.css';
import products from './data/products.json';
import { showProductContainer } from './homeProductCards';
import { updateCartCount } from './updateCartCount';
import { showCategories } from './showCategories';
import { filterProductsByCategoryAndSearch } from './filterProductsByCategoryAndSearch';
import { openProductPage } from './openProductPage';
import { getProductFromJSON } from './getProductFromJSON';

// Display products in card
showProductContainer(products);

// Update cart count
updateCartCount();

// Fill categories dropdown
showCategories(products);

// Filter products on search
document.getElementById('searchbar').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        var query = event.target.value;
        var category = document.getElementById('categories').value;

        var filteredProducts = filterProductsByCategoryAndSearch(category, query);
        showProductContainer(filteredProducts);

        // Open product details page
        document.querySelectorAll('.cards').forEach(el => {
            el.addEventListener('click', (event) => {
                // Show 1st SKU
                var id = event.target.closest('.cards').id.replace('card', '');
                var product = getProductFromJSON(id);
                var sku = product.skus[0].id;

                openProductPage(id, sku);
            });
        });
    }
});

// Filter products on category selection
document.getElementById('categories').addEventListener('change', (event) => {
    var query = document.getElementById('searchbar').value;
    var category = event.target.value;

    var filteredProducts = filterProductsByCategoryAndSearch(category, query);
    showProductContainer(filteredProducts);

    // Open product details page
    document.querySelectorAll('.cards').forEach(el => {
        el.addEventListener('click', (event) => {
            // Show 1st SKU
            var id = event.target.closest('.cards').id.replace('card', '');
            var product = getProductFromJSON(id);
            var sku = product.skus[0].id;

            openProductPage(id, sku);
        });
    });
});

// Open product details page
document.querySelectorAll('.cards').forEach(el => {
    el.addEventListener('click', (event) => {
        // Show 1st SKU
        var id = event.target.closest('.cards').id.replace('card', '');
        var product = getProductFromJSON(id);
        var sku = product.skus[0].id;

        openProductPage(id, sku);
    });
});