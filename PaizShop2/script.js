// Check LocalStorage for theme and language on load
window.onload = function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
    if (localStorage.getItem("language") === "bahasa") {
        toggleLanguage();
    }
    updateCartCount();
}

// Toggle Theme
function toggleTheme() {
    document.body.classList.toggle("dark");
    let theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
}

// Toggle Language (Example: Switches between English and Bahasa)
function toggleLanguage() {
    let currentLang = document.body.getAttribute("lang");
    document.body.setAttribute("lang", currentLang === "en" ? "ms" : "en");
    localStorage.setItem("language", currentLang === "en" ? "bahasa" : "english");
}

// Add to Cart
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function addToCart(itemName) {
    cart[itemName] = (cart[itemName] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    let count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    document.getElementById("cart-button").innerText = `Cart (${count > 99 ? '99+' : count})`;
}

// Open and Close Settings Popup
function openSettings() {
    document.getElementById("settings-popup").classList.add("visible");
}

function closeSettings() {
    document.getElementById("settings-popup").classList.remove("visible");
}

// Clear Data
function clearData() {
    localStorage.clear();
    cart = {};
    updateCartCount();
    alert("Data cleared.");
}
