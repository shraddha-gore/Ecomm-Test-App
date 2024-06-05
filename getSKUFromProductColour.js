import { getProductFromJSON } from "./getProductFromJSON";

// Search for colour in product skus & return matched SKU
export const getSKUFromProductColour = (id, colour) => {
    const product = getProductFromJSON(id);
    var sku = product.skus.find(ele => ele.colour === colour).id;

    return sku;
};