// Toggle Settings Modal
function toggleSettings() {
    const settingsModal = document.getElementById('settingsModal');
    settingsModal.style.display = settingsModal.style.display === 'block' ? 'none' : 'block';
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Clear Data
function clearData() {
    alert('Your data has been cleared!');
}
