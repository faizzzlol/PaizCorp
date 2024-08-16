// Validate Stock and Enable/Disable Buttons
function validateStock(item) {
    const quantityInput = document.getElementById(`quantity-${item}`);
    const stock = parseInt(document.getElementById(`stock-${item}`).innerText);
    const buyButton = document.getElementById(`buy-${item}`);

    // Ensure quantity does not exceed stock
    if (quantityInput.value > stock) {
        quantityInput.value = stock;
    }

    // Show "Sold Out" message and disable button if stock is 0
    if (stock === 0) {
        document.getElementById(`sold-out-${item}`).style.display = 'block';
        buyButton.disabled = true;
    } else {
        document.getElementById(`sold-out-${item}`).style.display = 'none';
        buyButton.disabled = false;
    }
}

// Handle "Buy Now" button
function buyItem(item, price) {
    const stock = parseInt(document.getElementById(`stock-${item}`).innerText);
    const quantity = parseInt(document.getElementById(`quantity-${item}`).value);

    // Check stock availability
    if (quantity > stock || stock === 0) {
        alert("Not enough stock available!");
        return;
    }

    // Store the item details in sessionStorage for checkout
    sessionStorage.setItem('selectedItem', JSON.stringify({
        item: item,
        quantity: quantity,
        price: price
    }));

    // Redirect to the checkout page
    window.location.href = '/PaizCorp/PaizShop/checkout'; // Ensure this path matches your actual checkout page
}

// Toggle delivery fields based on user selection
function toggleDelivery(isDelivery) {
    const coordinatesDiv = document.getElementById('coordinates');
    const pickupAddressDiv = document.getElementById('pickup-address');

    // Show/hide delivery and pickup sections
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
            const coordX = document.getElementById('coord-x').value;
            const coordY = document.getElementById('coord-y').value;
            const coordZ = document.getElementById('coord-z').value;

            // Validate Minecraft name
            if (!minecraftName) {
                alert("Minecraft Name is required!");
                return;
            }

            // Validate coordinates if delivery is selected
            if (deliveryRadio && (!coordX || !coordY || !coordZ)) {
                alert("Coordinates are required for delivery!");
                return;
            }

            const selectedItem = JSON.parse(sessionStorage.getItem('selectedItem'));
            const subtotal = selectedItem.quantity * selectedItem.price;
            const tax = subtotal * 0.03;
            let deliveryFee = 0;

            // Calculate delivery fee if delivery is selected
            if (deliveryRadio) {
                deliveryFee = calculateDeliveryFee(coordX, coordY, coordZ);
            }

            // Round the total to the nearest whole number
            let total = subtotal + tax + deliveryFee;
            total = Math.round(total);

            // Store order details in sessionStorage
            sessionStorage.setItem('orderDetails', JSON.stringify({
                item: selectedItem.item,
                quantity: selectedItem.quantity,
                subtotal: subtotal.toFixed(2),
                tax: tax.toFixed(2),
                deliveryFee: deliveryFee.toFixed(2),
                total: total,
                minecraftName: minecraftName,
                delivery: deliveryRadio,
                pickup: !deliveryRadio,
                address: !deliveryRadio ? '1, Jalan Utama, The LoL City, The LoL' : '',
                coordinates: deliveryRadio ? { x: coordX, y: coordY, z: coordZ } : null
            }));

            // Redirect to the order summary page
            window.location.href = '/PaizCorp/PaizShop/order-summary'; // Ensure this path matches your actual order summary page
        });
    }

    // Load Order Summary on Order Summary Page
    const orderSummaryDiv = document.getElementById('order-summary');
    if (orderSummaryDiv) {
        const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));

        // Display order summary
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
            const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));
            sendOrderToDiscord(orderDetails);
            alert("Order has been placed!");
            // Optionally clear the cart or redirect the user
        });
    }
});

// Function to calculate delivery fee
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

// Function to send order details to Discord
function sendOrderToDiscord(orderDetails) {
    const webhookUrl = 'https://discord.com/api/webhooks/1272139292889841677/sBsjI4ABTBTDhayfyDIVDk1cdmQ2Uc4hWeAsS81cj0-GXJEpvXi2g95PIFtbhcFjhYOI'; // Your actual webhook URL

    const message = {
        content: `**📦 New Order Placed 📦**\n\n` +
                 `**🛒 Order Details:**\n` +
                 `- **Item:** ${orderDetails.quantity}x ${orderDetails.item}\n` +
                 `- **Subtotal:** ${orderDetails.subtotal} Diamonds\n` +
                 `- **Delivery Fee:** ${orderDetails.deliveryFee} Diamonds (if applicable)\n` +
                 `- **Tax (3%):** ${orderDetails.tax} Diamonds\n` +
                 `- **Total Amount:** ${orderDetails.total} Diamonds\n\n` +
                 `**👤 Minecraft Name:**\n` +
                 `- ${orderDetails.minecraftName}\n\n` +
                 `${orderDetails.delivery ? '**🚚 Delivery Option:**\n` +
                 `- **Delivery Coordinates:** X: ${orderDetails.coordinates.x}, Y: ${orderDetails.coordinates.y}, Z: ${orderDetails.coordinates.z}` : '**📍 Pickup Option:**\n' +
                 `- **Pickup Address:** ${orderDetails.address}`}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }).then(response => {
        if (response.ok) {
            alert('Order sent to Discord!');
        } else {
            alert('Failed to send order to Discord.');
        }
    }).catch(error => {
        alert('Error:', error);
    });
}
