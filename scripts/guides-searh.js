document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const typeSelect = document.getElementById('charSelect');
    const guidesCardsContainer = document.getElementById('guidesCardsContainer');

    const cards = guidesCardsContainer.querySelectorAll('.guides__card-link');

    function applyGuideFilters() {
        if (!searchInput || !typeSelect || !guidesCardsContainer) return; 

        const searchText = searchInput.value.toLowerCase();
        const selectedType = typeSelect.value;

        cards.forEach(card => {
            const cardTitle = card.querySelector('.guides__card-title').textContent.toLowerCase(); 
            const cardType = card.getAttribute('data-type'); 
            
            const matchesSearch = cardTitle.includes(searchText);
            
            const matchesType = !selectedType || cardType === selectedType;

            if (matchesSearch && matchesType) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyGuideFilters);
    }
    
    if (typeSelect) {
        typeSelect.addEventListener('change', applyGuideFilters);
    }
    
    applyGuideFilters();
});