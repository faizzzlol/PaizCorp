function buyItem(itemId) {
    const stockElement = document.getElementById(`stock-${itemId}`);
    const stock = parseInt(stockElement.textContent, 10);

    if (stock > 0) {
        const quantity = document.getElementById(`quantity-${itemId}`).value;
        window.location.href = `/PaizCorp/PaizShop/checkout?item=${itemId}&quantity=${quantity}`;
    } else {
        alert("This item is sold out!");
    }
}


function calculateDeliveryFee(userX, userY, userZ) {
    const shopX = 5000;
    const shopY = 70;
    const shopZ = 6000;

    const distance = Math.sqrt(Math.pow(userX - shopX, 2) + Math.pow(userY - shopY, 2) + Math.pow(userZ - shopZ, 2));
    const fee = Math.ceil(distance / 1000); // 1 diamond per 1000 blocks

    return fee;
}

function updateOrderSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const item = urlParams.get('item');
    const quantity = parseInt(urlParams.get('quantity'), 10);

    const itemName = item === 'shulker' ? 'Shulker Box' : 'Mending';
    const itemPrice = item === 'shulker' ? 1 : 3;

    const subtotal = itemPrice * quantity;
    const tax = subtotal * 0.03;

    let deliveryFee = 0;
    const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;
    if (deliveryOption === 'delivery') {
        const userX = parseInt(document.getElementById('coord-x').value, 10);
        const userY = parseInt(document.getElementById('coord-y').value, 10);
        const userZ = parseInt(document.getElementById('coord-z').value, 10);
        deliveryFee = calculateDeliveryFee(userX, userY, userZ);
    }

    const total = subtotal + tax + deliveryFee;

    document.getElementById('order-summary').innerHTML = `
        ${quantity} x ${itemName} - ${subtotal} Diamonds
        <br>
        Subtotal: ${subtotal} Diamonds
        <br>
        Delivery Fee: ${deliveryFee} Diamonds
        <br>
        The LoL Tax TST 3%: ${tax.toFixed(2)} Diamonds
        <br>
        Total: ${total} Diamonds
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('/PaizCorp/PaizShop/checkout')) {
        document.getElementById('checkout-btn').addEventListener('click', updateOrderSummary);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const deliveryRadio = document.getElementById('delivery');
    const pickupRadio = document.getElementById('pickup');
    const coordinateFields = document.getElementById('coordinate-fields');
    const pickupAddress = document.getElementById('pickup-address');

    function updateForm() {
        if (deliveryRadio.checked) {
            coordinateFields.style.display = 'block';
            pickupAddress.style.display = 'none';
        } else if (pickupRadio.checked) {
            coordinateFields.style.display = 'none';
            pickupAddress.style.display = 'block';
        }
    }

    // Update form on page load
    updateForm();

    // Add event listeners to the radio buttons
    deliveryRadio.addEventListener('change', updateForm);
    pickupRadio.addEventListener('change', updateForm);
});

