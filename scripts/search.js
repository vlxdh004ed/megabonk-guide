function filterCharacters() {
    const input = document.getElementById('characterSearch');
    const filter = input.value.toUpperCase();

    const characterList = document.querySelector('.character-list'); 

    const cards = characterList.getElementsByClassName('character-card-link');

    for (let i = 0; i < cards.length; i++) {
        const nameElement = cards[i].querySelector('.character-name');
        
        if (nameElement) {
            const nameText = nameElement.textContent || nameElement.innerText;
            
            if (nameText.toUpperCase().indexOf(filter) > -1) {
                cards[i].style.display = ""; 
            } else {
                cards[i].style.display = "none";
            }
        }
    }
}