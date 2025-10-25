
    const searchInput = document.getElementById('searchInput');
    const directoryCardsContainer = document.getElementById('directoryCards');
    const cards = directoryCardsContainer.getElementsByTagName('a'); // Получаем все ссылки-карточки

    // Функция для выполнения поиска
    function filterCards() {
        // Получаем текст из поля ввода и приводим его к нижнему регистру
        const filter = searchInput.value.toLowerCase();

        // Проходимся по всем карточкам
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            // Собираем весь текст из карточки (заголовок и описание)
            const textContent = card.textContent || card.innerText;
            
            // Проверяем, содержит ли текст карточки поисковый запрос
            if (textContent.toLowerCase().indexOf(filter) > -1) {
                // Если содержит, показываем карточку (display: grid/block/flex)
                card.style.display = ""; 
            } else {
                // Если не содержит, скрываем карточку
                card.style.display = "none";
            }
        }
    }

    // Привязываем функцию filterCards к событию 'keyup' (срабатывает при отпускании клавиши)
    searchInput.addEventListener('keyup', filterCards);

    // Дополнительно привяжем к кнопке "Найти", хотя keyup дает мгновенный результат
    const searchButton = document.querySelector('.search-box button');
    searchButton.addEventListener('click', filterCards);
