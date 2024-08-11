document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-btn');
    const itemInput = document.getElementById('item');
    const checkoutForm = document.getElementById('checkout-form');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            itemInput.value = button.getAttribute('data-item');
        });
    });

    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(checkoutForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const response = await fetch('/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Purchase complete!');
            checkoutForm.reset();
        } else {
            alert('Error completing purchase.');
        }
    });
});
