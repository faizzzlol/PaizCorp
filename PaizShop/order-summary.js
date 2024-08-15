document.addEventListener('DOMContentLoaded', () => {
    const orderSummary = document.getElementById('order-summary');

    // Get data from session storage
    const minecraftName = sessionStorage.getItem('minecraftName');
    const delivery = sessionStorage.getItem('delivery') === 'true';
    const coordinates = delivery ? JSON.parse(sessionStorage.getItem('coordinates')) : null;

    // Calculate delivery fee if needed
    const shopCoordinates = { x: 5000, y: 70, z: 6000 };
    const deliveryFee = delivery ? calculateDistance(shopCoordinates, coordinates) * 0.1 : 0; // Example fee calculation
    const subtotal = 1; // Replace with actual subtotal
    const tax = subtotal * 0.03;
    const total = subtotal + tax + deliveryFee;

    orderSummary.innerHTML = `
        <h3>Order Summary</h3>
        <p>${minecraftName} - 1 Item - 1 Diamond</p>
        <hr>
        <p>Subtotal: 1 Diamond</p>
        ${delivery ? `<p>Delivery Fee: ${deliveryFee.toFixed(2)} Diamond</p>` : ''}
        <p>The LoL Tax (TST) (3%): ${tax.toFixed(2)} Diamond</p>
        <hr>
        <p>Paid with: <img src="/path/to/diamond-icon.png" alt="Diamond"> ${total.toFixed(2)} Diamond</p>
    `;

    document.getElementById('place-order-button').addEventListener('click', () => {
        // Implement order placement logic
        alert('Order placed successfully!');
    });
});

function calculateDistance(coord1, coord2) {
    const dx = coord1.x - coord2.x;
    const dy = coord1.y - coord2.y;
    const dz = coord1.z - coord2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
