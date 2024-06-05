import offers from './data/offers.json';

export const showOffers = () => {
    const offersDropdown = document.getElementById('offers');
    const subtotal = Number(localStorage.getItem('subtotal'));

    // Remove all options
    offersDropdown.innerHTML = '';

    // Create a default option
    var option = document.createElement("option");

    option.value = 'No Offer';
    option.innerText = 'No Offer';

    offersDropdown.appendChild(option);

    // Iterate over offers & create options for eligible offers
    offers.forEach((offer) => {
        if (subtotal >= Number(offer.threshold.toFixed(2))) {
            let option = document.createElement("option");

            option.value = offer.id;
            option.innerText = offer.label;

            offersDropdown.appendChild(option);
        }
    });
};