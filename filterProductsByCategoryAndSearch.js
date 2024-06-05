import products from './data/products.json';

// Return products containing query
export const filterProductsByCategoryAndSearch = (category, query) => {
    var filteredProducts;

    // Filter products by category
    if (category === 'All') {
        filteredProducts = products;
    }
    else {
        filteredProducts = products.filter(ele => ele.category === category);
    }

    // Filter products by search query
    filteredProducts = filteredProducts.filter(ele => ele.name.toLowerCase().includes(query.toString().toLowerCase()));

    return filteredProducts;
};