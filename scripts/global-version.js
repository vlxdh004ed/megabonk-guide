const GAME_VERSION = '1.0.19';

document.addEventListener('DOMContentLoaded', () => {
    const versionElements = document.querySelectorAll('.version-display-placeholder');
    
    versionElements.forEach(el => {
        el.textContent = GAME_VERSION;
    });
});