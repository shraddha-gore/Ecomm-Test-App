import products from './data/products.json';

// Find and return cart product
export const getProductFromJSON = (id) => {
    const product = products.find(ele => ele.id === id);

    return product;
};