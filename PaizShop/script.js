document.addEventListener('DOMContentLoaded', () => {
    const stock = {
        shulker: 1755,
        mending: 0
    };

    function validateStock(item) {
        const quantity = document.getElementById(`quantity-${item}`).value;
        const stockCount = stock[item];

        if (quantity > stockCount) {
            document.getElementById(`quantity-${item}`).value = stockCount;
        }
    }

    function buyItem(item) {
        const quantity = document.getElementById(`quantity-${item}`).value;
        const stockCount = stock[item];

        if (quantity <= stockCount) {
            stock[item] -= quantity;
            document.getElementById(`stock-${item}`).innerText = stock[item];

            if (stock[item] == 0) {
                document.getElementById(`buy-${item}`).disabled = true;
                document.getElementById(`sold-out-${item}`).style.display = 'block';
            }
        }
    }

    // Initialize the stock display and button state on page load
    Object.keys(stock).forEach(item => {
        document.getElementById(`stock-${item}`).innerText = stock[item];
        if (stock[item] == 0) {
            document.getElementById(`buy-${item}`).disabled = true;
            document.getElementById(`sold-out-${item}`).style.display = 'block';
        }
    });

    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const item = button.getAttribute('data-item').toLowerCase().replace(/\s+/g, '');
            const quantityInputId = button.getAttribute('data-quantity-id');
            const quantity = document.getElementById(quantityInputId).value;
            const userName = prompt("Enter your name:");
            const userEmail = prompt("Enter your email:");

            if (userName && userEmail) {
                const data = {
                    name: userName,
                    email: userEmail,
                    item: item,
                    quantity: quantity
                };

                const response = await fetch('/api/purchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Purchase complete!');
                    buyItem(item); // Call buyItem after successful purchase
                } else {
                    alert('Error completing purchase.');
                }
            } else {
                alert('Purchase cancelled.');
            }
        });
    });
});
