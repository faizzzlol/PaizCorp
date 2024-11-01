let cart = JSON.parse(localStorage.getItem("cart")) || {};
let theme = localStorage.getItem("theme") || "light";
let language = localStorage.getItem("language") || "en";

function loadSettings() {
    // Apply Theme
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
    document.getElementById("themeToggle").checked = theme === "dark";

    // Set Language
    document.getElementById("languageSelect").value = language;

    // Load Cart Count
    updateCartCount();
}

function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", theme);
}

function saveSettings() {
    language = document.getElementById("languageSelect").value;
    localStorage.setItem("language", language);
}

function addToCart(itemName, quantity) {
    cart[itemName] = (cart[itemName] || 0) + quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let count = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
    document.getElementById("cartCount").innerText = count > 99 ? "99+" : count;
}

function openSettings() {
    document.getElementById("settingsModal").style.display = "flex";
}

function closeSettings() {
    document.getElementById("settingsModal").style.display = "none";
}

function clearData() {
    localStorage.clear();
    cart = {};
    updateCartCount();
    loadSettings();
}

function openCart() {
    window.location.href = "cart.html";
}
