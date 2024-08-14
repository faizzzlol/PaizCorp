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
            }
        });
    });
});
