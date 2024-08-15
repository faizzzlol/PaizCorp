document.addEventListener('DOMContentLoaded', () => {
    const stock = {
        shulker: 1755,
        mending: 0
    };

    function validateStock(item) {
        const quantityInput = document.getElementById(`quantity-${item}`);
        if (quantityInput) {
            const quantity = quantityInput.value;
            const stockCount = stock[item];

            if (quantity > stockCount) {
                quantityInput.value = stockCount;
            }
        }
    }

    function buyItem(item) {
        const quantityInput = document.getElementById(`quantity-${item}`);
        if (quantityInput) {
            const quantity = quantityInput.value;
            const stockCount = stock[item];

            if (quantity <= stockCount) {
                stock[item] -= quantity;
                const stockElem = document.getElementById(`stock-${item}`);
                if (stockElem) stockElem.innerText = stock[item];

                if (stock[item] == 0) {
                    const buyBtn = document.getElementById(`buy-${item}`);
                    const soldOutElem = document.getElementById(`sold-out-${item}`);
                    if (buyBtn) buyBtn.disabled = true;
                    if (soldOutElem) soldOutElem.style.display = 'block';
                }

                // Store the item and quantity in session storage
                sessionStorage.setItem('item', item);
                sessionStorage.setItem('quantity', quantity);

                // Redirect to the checkout page
                window.location.href = 'checkout.html';
            } else {
                alert('Not enough stock available.');
            }
        } else {
            console.error(`Quantity input for item '${item}' not found.`);
        }
    }

    // Initialize the stock display and button state on page load
    Object.keys(stock).forEach(item => {
        const stockElem = document.getElementById(`stock-${item}`);
        const buyBtn = document.getElementById(`buy-${item}`);
        const soldOutElem = document.getElementById(`sold-out-${item}`);

        if (stockElem) stockElem.innerText = stock[item];
        if (stock[item] == 0) {
            if (buyBtn) buyBtn.disabled = true;
            if (soldOutElem) soldOutElem.style.display = 'block';
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
