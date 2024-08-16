// Toggle delivery fields based on user selection
function toggleDelivery(isDelivery) {
    const coordinatesDiv = document.getElementById('coordinates');
    const pickupAddressDiv = document.getElementById('pickup-address');

    if (isDelivery) {
        coordinatesDiv.style.display = 'block';
        pickupAddressDiv.style.display = 'none';
    } else {
        coordinatesDiv.style.display = 'none';
        pickupAddressDiv.style.display = 'block';
    }
}

// Handle Checkout Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const checkoutForm = document.getElementById('checkout-form');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const minecraftName = document.getElementById('minecraft-name').value;
            const deliveryRadio = document.getElementById('delivery').checked;
            const pickupRadio = document.getElementById('pickup').checked;
            const coordX = document.getElementById('coord-x').value;
            const coordY = document.getElementById('coord-y').value;
            const coordZ = document.getElementById('coord-z').value;

            if (!minecraftName) {
                alert("Minecraft Name is required!");
                return;
            }

            if (deliveryRadio && (!coordX || !coordY || !coordZ)) {
                alert("Coordinates are required for delivery!");
                return;
            }

            const selectedItem = JSON.parse(sessionStorage.getItem('selectedItem'));
            const subtotal = selectedItem.quantity * selectedItem.price;
            const tax = subtotal * 0.03;
            let deliveryFee = 0;

            if (deliveryRadio) {
                deliveryFee = calculateDeliveryFee(coordX, coordY, coordZ);
            }

            let total = subtotal + tax + deliveryFee;

            // Round the total to the nearest whole number (since diamonds don't have cents)
            total = Math.round(total);

            sessionStorage.setItem('orderDetails', JSON.stringify({
                item: selectedItem.item,
                quantity: selectedItem.quantity,
                price: selectedItem.price,
                subtotal: subtotal.toFixed(2),
                tax: tax.toFixed(2),
                deliveryFee: deliveryFee.toFixed(2),
                total: total,
                delivery: deliveryRadio,
                pickup: pickupRadio,
                address: pickupRadio ? '1, Jalan Utama, The LoL City, The LoL' : '',
                coordinates: deliveryRadio ? { x: coordX, y: coordY, z: coordZ } : null
            }));

            window.location.href = 'order-summary.html';
        });
    }

    // Load Order Summary on Order Summary Page
    const orderSummaryDiv = document.getElementById('order-summary');
    if (orderSummaryDiv) {
        const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));

        orderSummaryDiv.innerHTML = `
            <h2>Order Summary</h2>
            <p>${orderDetails.quantity}x ${orderDetails.item} - ${orderDetails.subtotal} Diamonds</p>
            <hr>
            <p>Subtotal: ${orderDetails.subtotal} Diamonds</p>
            <p>Delivery Fee: ${orderDetails.deliveryFee} Diamonds</p>
            <p>The LoL Tax (3%): ${orderDetails.tax} Diamonds</p>
            <hr>
            <p>Total: ${orderDetails.total} Diamonds</p>
            <p>Paid with: <img src="diamond.png" alt="Diamond Logo" style="height: 20px;"> Diamonds on delivery</p>
        `;
    }

    // Handle Place Order
    const placeOrderButton = document.getElementById('place-order');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', function () {
            alert("Order has been placed!");
            // You can add further actions here, like sending data to a server
        });
    }
});

// Example function to calculate delivery fee
function calculateDeliveryFee(x, y, z) {
    const shopX = 5000;
    const shopY = 70;
    const shopZ = 6000;

    const distance = Math.sqrt(
        Math.pow((x - shopX), 2) +
        Math.pow((y - shopY), 2) +
        Math.pow((z - shopZ), 2)
    );

    return distance / 1000; // 1 diamond per 1000 blocks
}
