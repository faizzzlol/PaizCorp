document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const item = button.getAttribute('data-item');
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
                } else {
                    alert('Error completing purchase.');
                }
            } else {
                alert('Purchase cancelled.');
                // Initial stock levels for each item
            let stock = {
                shulker: 1755,
                mending: 0
            };

            // Function to validate stock levels when user inputs quantity
            function validateStock(item) {
                const quantity = document.getElementById(`quantity-${item}`).value;
                const stockCount = stock[item];

                if (quantity > stockCount) {
                    document.getElementById(`quantity-${item}`).value = stockCount;
                }
            }

            // Function to handle item purchase
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
            document.addEventListener("DOMContentLoaded", function() {
                Object.keys(stock).forEach(item => {
                    document.getElementById(`stock-${item}`).innerText = stock[item];
                    if (stock[item] == 0) {
                        document.getElementById(`buy-${item}`).disabled = true;
                        document.getElementById(`sold-out-${item}`).style.display = 'block';
           }
    });
});
