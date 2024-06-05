export const showCategories = (products) => {
    const categoriesDropdown = document.getElementById("categories");

    // Create a default option
    var option = document.createElement("option");

    option.value = 'All';
    option.innerText = 'All';

    categoriesDropdown.appendChild(option);

    // Create an array to store unique categories
    var categories = [];

    // Iterate over products & create options
    products.forEach((product) => {
        let category = product.category;

        if (!categories.includes(category)) {
            let option = document.createElement("option");

            option.value = category;
            option.innerText = category;

            categoriesDropdown.appendChild(option);
            categories.push(category);
        }
    });
};