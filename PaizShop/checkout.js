document.addEventListener('DOMContentLoaded', () => {
    const deliveryOption = document.getElementById('delivery-option');
    const deliveryDetails = document.getElementById('delivery-details');
    const pickupDetails = document.getElementById('pickup-details');

    deliveryOption.addEventListener('change', () => {
        if (deliveryOption.value === 'delivery') {
            deliveryDetails.style.display = 'block';
            pickupDetails.style.display = 'none';
        } else {
            deliveryDetails.style.display = 'none';
            pickupDetails.style.display = 'block';
        }
    });

    document.getElementById('checkout-button').addEventListener('click', () => {
        const minecraftName = document.getElementById('minecraft-name').value;
        const delivery = deliveryOption.value === 'delivery';
        const coordinates = delivery ? {
            x: document.getElementById('coordinate-x').value,
            y: document.getElementById('coordinate-y').value,
            z: document.getElementById('coordinate-z').value
        } : null;

        if (!minecraftName) {
            alert('Minecraft Name is required.');
            return;
        }

        // Store data for order summary
        sessionStorage.setItem('minecraftName', minecraftName);
        sessionStorage.setItem('delivery', delivery);
        if (delivery) {
            sessionStorage.setItem('coordinates', JSON.stringify(coordinates));
        }

        // Redirect to order summary page
        window.location.href = 'order-summary.html';
    });
});
