// Create & show toast
export const showToast = (content) => {
    // Create a HTML element
    let toast = document.createElement("div");
    toast.classList.add('toast');

    toast.innerHTML = `${content}`;

    // Add to DOM
    document.body.appendChild(toast);

    // Remove after 2 seconds
    setTimeout(() => {
        toast.remove();
    }, 2000);
};