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

            // Store the item and quantity in session storage
            sessionStorage.setItem('item', item);
            sessionStorage.setItem('quantity', quantity);

            // Redirect to the checkout page
            window.location.href = '/PaizCorp/PaizShop/checkout';
        } else {
            alert('Not enough stock available.');
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
        button.addEventListener('click', () => {
            const item = button.getAttribute('data-item').toLowerCase().replace(/\s+/g, '');
            buyItem(item);
        });
    });
});
