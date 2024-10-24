$('.order').click(function (e) {
    let button = $(this);

    if (!button.hasClass('animate')) {
        button.addClass('animate');
        button.attr('disabled', true); // Disable the button
        button.css('cursor', 'not-allowed'); // Change cursor to not-allowed

        // Change the text to "Order Placed"
        button.find('.default').text('Order Placed');
        
        setTimeout(() => {
            button.removeClass('animate');
        }, 10000);
    }
});
		document.addEventListener('DOMContentLoaded', function () {
            const orderSummaryDiv = document.getElementById('order-summary');
            const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));

            // Calculate stack count
            const diamondPerStack = 64;
            const totalStacks = Math.floor(orderDetails.total / diamondPerStack);
            const remainingDiamonds = orderDetails.total % diamondPerStack;

            // Generate a unique order number (e.g., a random number or based on timestamp)
            const orderNumber = 'PS' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

            // Display order summary
            orderSummaryDiv.innerHTML = `
                <div class="order-summary-section">
                    <h2>Order Summary</h2>
                    <div class="order-summary-item">
                        <h3>Order Number:</h3>
                        <p>${orderNumber}</p>
                    </div>
                    <div class="order-summary-item">
                        <h3>Item Ordered:</h3>
                        <p>${orderDetails.quantity}x ${orderDetails.item}</p>
                    </div>
                    <div class="order-summary-item">
                        <h3>Subtotal:</h3>
                        <p>${orderDetails.subtotal} Diamonds</p>
                    </div>
                    <div class="order-summary-item">
                        <h3>Delivery Fee:</h3>
                        <p>${orderDetails.deliveryFee} Diamonds</p>
                    </div>
                    <div class="order-summary-item">
                        <h3>The LoL Tax (3%):</h3>
                        <p>${orderDetails.tax} Diamonds</p>
                    </div>
                    <div class="order-summary-item">
                        <h3>Rounding Details:</h3>
                        <p class="rounding-details">Total Rounded: ${orderDetails.total} Diamonds</p>
                    </div>
                    <div class="order-summary-item">
                        <h3>Stack Count:</h3>
                        <p class="stack-count">${totalStacks} Stack(s) and ${remainingDiamonds} Diamond(s)</p>
                    </div>
                    <div class="order-summary-item">
                        <h3>Total Amount:</h3>
                        <p>${orderDetails.total} Diamonds</p>
                    </div>
                </div>
            `;

            // Handle Place Order
            const placeOrderButton = document.getElementById('place-order');
            if (placeOrderButton) {
                placeOrderButton.addEventListener('click', function () {
                    const webhookUrl = 'https://discord.com/api/webhooks/1272139292889841677/sBsjI4ABTBTDhayfyDIVDk1cdmQ2Uc4hWeAsS81cj0-GXJEpvXi2g95PIFtbhcFjhYOI';

                    // Send order to Discord
                    sendOrderToDiscord(orderDetails, orderNumber, webhookUrl, totalStacks, remainingDiamonds);

                    // Disable the Place Order button
                    placeOrderButton.disabled = true;
                    placeOrderButton.textContent = 'Order Placed';
                    placeOrderButton.style.backgroundColor = '#d9534f'; // Change the button color to indicate it's disabled
                    alert("Order has been placed!");
                });
            }
        });

        // Function to send order details to Discord webhook
        function sendOrderToDiscord(orderDetails, orderNumber, webhookUrl, totalStacks, remainingDiamonds) {
            const currentTime = new Date().toLocaleString(); // Get the current date and time
            const embed = {
                "content": null,
                "embeds": [
                    {
                        "title": "📦 New Order Placed 📦",
                        "color": 5814783,
                        "fields": [
                            { "name": "🛒 **Order Number**", "value": orderNumber },
                            {
                                "name": "🛒 **Order Details**",
                                "value": `**Item:** ${orderDetails.quantity}x ${orderDetails.item}\n**Subtotal:** 💎${orderDetails.subtotal} Diamonds\n**Delivery Fee:** 💎${orderDetails.deliveryFee} Diamonds (if applicable)\n**Tax (3%):** 💎${orderDetails.tax}\n**Total:** 💎${orderDetails.total} Diamonds`
                            },
                            { "name": "📊 **Rounding Details**", "value": `Total Rounded: 💎${orderDetails.total} Diamonds` },
                            {
                                "name": "🛠 **Stack Count**",
                                "value": `${totalStacks} Stack(s) and ${remainingDiamonds} Diamond(s)`
                            },
                            { "name": "👤 **Minecraft Name**", "value": orderDetails.minecraftName },
                            {
                                "name": orderDetails.delivery ? "🚚 **Delivery Option**" : "📍 **Pickup Option**",
                                "value": orderDetails.delivery
                                    ? `**Delivery Coordinates:** X: ${orderDetails.coordinates.x}, Y: ${orderDetails.coordinates.y}, Z: ${orderDetails.coordinates.z}`
                                    : `**Pickup Address:** ${orderDetails.address}`
                            },
                            { "name": "🕒 **Order Time**", "value": `Placed on: ${currentTime}` },
                            { "name": "📞 **Contact Information**", "value": orderDetails.contactInfo || "Not provided" }
                        ],
                        "footer": { "text": "Order placed on Paiz Shop" }
                    }
                ],
                "attachments": []
            };

            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(embed)
            }).then(response => {
                if (response.ok) {
                    console.log('Order sent to Discord!');

                    // Update ongoing orders in localStorage
                    const ongoingOrders = JSON.parse(localStorage.getItem('ongoingOrders')) || [];
                    ongoingOrders.push({ ...orderDetails, orderNumber, status: "Processing" });
                    localStorage.setItem('ongoingOrders', JSON.stringify(ongoingOrders));

                    // Update order history in localStorage
                    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
                    orderHistory.push({ ...orderDetails, orderNumber });
                    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
                } else {
                    console.error('Failed to send order to Discord:', response.statusText);
                }
            }).catch(error => {
                console.error('Error sending order to Discord:', error);
            });
        }

        // Function to toggle theme between light and dark mode
        function toggleTheme() {
            const body = document.body;
            if (body.getAttribute('data-theme') === 'light') {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        }

        // Preserve the user's theme preference on page load
        document.addEventListener('DOMContentLoaded', function () {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.body.setAttribute('data-theme', savedTheme);
                document.getElementById('theme-toggle').checked = (savedTheme === 'dark');
            }
        });
});
