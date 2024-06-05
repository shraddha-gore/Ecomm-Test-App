// Update selected offer
export const updateSelectedOffer = (offer) => {
    let id = offer.id;

    // Update in UI
    if (id === undefined) {
        document.querySelector('#offers').value = 'No Offer';
    }
    else {
        document.querySelector('#offers').value = id;
    }

    // Update in LS
    localStorage.setItem('selectedOffer', JSON.stringify({ "id": offer.id }));
};