document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('buildModal');
    const buildsGrid = document.getElementById('buildsGrid');
    const closeModalBtn = document.getElementById('closeModalBtn');

    const modalTitle = document.getElementById('modal-build-title');
    const modalCharName = document.getElementById('modal-char-name');
    const modalItemsGrid = document.getElementById('modalItemsGrid'); 
    const modalLevelingList = document.getElementById('modalLevelingList');
    const modalUpList = document.getElementById('modalUpList');
    const modalTipsContent = document.getElementById('modalTipsContent'); 

    const searchInput = document.getElementById('searchInput');
    const charSelect = document.getElementById('charSelect');
    const tierSelect = document.getElementById('tierSelect');

    
    const BUILDS_DATA = {
        'Robinette-gold': {
            character: 'Робинетта (Robinette)',
            tier: 'S',
            weapons: [
                { icon: 'Bow.png', name: 'Лук', description: 'Основное оружие лучницы' },
                { icon: 'aura.png', name: 'Аура', description: 'АоЕ урон, дает возможнось не задыхаться в рои' },
                { icon: 'firewalker.png', name: 'Огненный странник', description: 'Большой урон по АоЕ, брать обязательно' },
                { icon: 'Dexecutioner.png', name: 'Дексекьюционер', description: 'Аое урон, есть шанс моментально убить врага' },
            ],
            tomes: [
                { icon: 'GoldenTome.png', name: 'Золотой Том', description: '+ Увеличение Золота, брать обязательно' },
                { icon: 'XpTome.png', name: 'Том Опыта', description: '+ Увеличение Опыта, брать обязательно' },
                { icon: 'CursedTome.png', name: 'Проклятый Том', description: '+ Сложность, + кол-во мобов' },
                { icon: 'ChaosTome.png', name: 'Том Хаоса', description: 'Качает случайную характеристику' },
            ],
            gear: [
                { icon: 'kevin.png', name: 'Кевин', description: '25% с каждой тычки наносишь себе урон' },
                { icon: 'itemGoldenShield.png', name: 'Золотой щит', description: '+ золото, когда получаешь урон' },
            ],
            // ------------------------------------
            leveling: [
                'На первой локе фармим ключи, дублируем в микровейве, ищем карту на удачу.',
                'Со второй локи начинаем открывать сундуки, стараемся здесь найти кевина и шилд на голду и стоим афк на финальном рое',
                'На третей локе дооткрываем сундуки, ищем соки, проклятые лапки, часы и прочие легендарки с уже раздутой удачей',
                'На последней, до 6 минуты собираем сундуки на последние легендарки, и стоим афк триггерим соки',
            ],
            Up: [
                'С начала максим Том Опыта и Проклятый Том, выходим с первой локи минимум с 45 лвл',
                'Начинаем прокачивать оружия после наковальни и минимум 100 лака',
            ],
            tips: 'Кевин + шилд + вкачаный том золота дает миллион золота, пасивка лучницы дает урон за голду',
        },

        'Noelle-ice': {
            character: 'Ноэль',
            tier: 'S',
            weapons: [
                { icon: 'frostwalker.png', name: 'Ледяной Странник', description: 'Основное оружие персонажа' },
                { icon: 'firewalker.png', name: 'Огненный странник', description: 'Большой урон по АоЕ, брать обязательно' },
                { icon: 'katana.png', name: 'Катана', description: 'Хороший дпс на старте дает выживаемость' },
                { icon: 'Dexecutioner.png', name: 'Дексекьюционер', description: 'Аое урон, есть шанс моментально убить врага' },
            ],
            tomes: [
                { icon: 'CursedTome.png', name: 'Проклятый Том', description: '+ Сложность, + кол-во мобов' },
                { icon: 'XpTome.png', name: 'Том Опыта', description: '+ Увеличение Опыта, брать обязательно' },
                { icon: 'LuckTome.png', name: 'Том Удачи', description: 'Больше лака' },
                { icon: 'PrecisionTome.png', name: 'Том Точности', description: '+ Шанс крита, брать для доп урона, можно ещё взять том урона' },
            ],
            gear: [
                { icon: 'ItemIceCrystal.png', name: 'Ледяной Кристал', description: 'Хорошо бустит урон на старте, и в миде' },
                { icon: 'itemIceCube.png', name: 'Ледяной Куб', description: 'Наверное мейн айтем для билда' },
            ],
            // 
            leveling: [
                'С первой локи стараемся выйти с 40 лвл и раздутым лаком',
                'На второй, из сундуков желательно найти айтемы для выживаемости, чтобы уже стоять до 12 минуты',
                'На 3й и 4й дооткрываем сундуки из мобов и ищем соки',
            ],
            Up: [
                'Вначале максим экспу и проклятый том тобы быстрее раздуть сайз за счет лвл',
                'На ледяных странниках по приоритетности раздуваем флэт урон и длительность, а на огненых максим проджи, урон и длительность',
                'Остальное желательно прокачивать уже после анвила, в приоритете: флэт урон, проджи, крит урон',
            ],
            tips: 'Урон бустится за счет пассивки Ноэль: за каждых 3 моба + ~0.1% урона, по этому в приоритете со старта раскачать дификулт для увеличения кол-во врагов. Ещё есть вариант вместо тома на криты взять том на перезарядку, чтобы основной урон был на тапках, но все равно в лейте лучше затариться проклятыми лапками',
        },
        'Vlad-bloodmarks': {
            tier: 'S',
            character: 'Влад',
            weapons: [ 
                { icon: 'bone-weapon.png', name: 'Костяная Коса', description: 'Основное оружие, синергия с критом.' },
                { icon: 'dagger.png', name: 'Кинжал Удачи', description: 'Высокий шанс крита' },
                { icon: 'chain-light.png', name: 'Цепная Молния', description: 'Быстрое нанесение критов' },
                { icon: 'poison-orb.png', name: 'Ядовитый Шар', description: 'Доп. урон по криту' },
            ],
            tomes: [
                { icon: 'tome-crit.png', name: 'Том Крита', description: 'Максимальный шанс критического урона' },
                { icon: 'tome-luck.png', name: 'Том Удачи', description: 'Увеличение удачи' },
                { icon: 'tome-damage.png', name: 'Том Урона', description: 'Увеличение базового урона' },
                { icon: 'tome-cooldown.png', name: 'Том Перезарядки', description: 'Уменьшение кулдауна' },
            ],
            gear: [
                { icon: 'item-crit.png', name: 'Перчатки Крита', description: 'Ключ к максимальному урону.' },
                { icon: 'item-damage.png', name: 'Зелье Силы', description: 'Дополнительный чистый урон.' },
                { icon: 'item-luck.png', name: 'Талисман Удачи', description: 'Буст для критов' },
            ],
            leveling: [
                '',
                '',
                '',
            ],
            Up: [
                '',
                '',
            ],
            tips: '',
        },
        'Megachad-thorns': {
            character: 'Мегачад',
            tier: 'S',
            weapons: [ 
                { icon: 'aura.png', name: 'Аура', description: 'Основное оружие Чада' },
                { icon: 'Egida.png', name: 'Эгида', description: 'Чтобы жить' },
                { icon: 'bluetooth knife.png', name: 'Беспроводной кинжал', description: 'Брать во второй слот, изи прохождение первой локи' },
                { icon: 'katana.png', name: 'Катана', description: 'Большой дпс со старта' },
            ],
            tomes: [
                { icon: 'armorTome.png', name: 'Том Армора', description: 'Больше армора, обязательно для билда' },
                { icon: 'ThornsTome.png', name: 'Том Шипов', description: 'Так же основа билда' },
                { icon: 'XpTome.png', name: 'Том Опыта', description: '+ Опыт' },
                { icon: 'cursedTome.png', name: 'Проклятый Том', description: '+ Кол-во мобов - больше опыта' },
            ],
            gear: [
                { icon: 'itemcactus.png', name: 'Кактус', description: 'Выстреливает шипами при получении урона, урон так же зависит от шипов' },
                { icon: 'kevin.png', name: 'Кевин', description: 'Синергия с кактусом, основа билда' },
                { icon: 'itemSpikyShieldf.png', name: 'Щит с Шипами', description: '+2 шипы за каждый % армора, синергия с томом на армор' },
            ],
            leveling: [
                'Вначале стараемся максить армор и шипы, чтобы жить',
                'Параллельно ищем кактус с кевином, и уже должно хватать дпс',
            ],
            Up: [
                'Максим опыт, после первого роя ищем кинжал',
                'На кинжалах максим проджи и баунсы, ищем сыры чтобы убить босов',
                'После кевина с кактусом, апаем армор',
                'После Щита с Шипами, ',
            ],
            tips: 'Из второстепенных айтемов можно взять маску квина, электро вилку или голд шилд, лишними не будут',
        },
    };

    const createItemHtml = (item, type) => `
        <div class="build-details__item-detail ${type}">
            <div class="icon" style="background-image: url('images/builds-content/${item.icon}');"></div> 
            <div class="name">${item.name}</div>
            <div class="description">${item.description}</div>
        </div>
    `;

    const fillModal = (build, title) => {
        // Заголовки
        modalTitle.textContent = `${title}`;
        modalCharName.textContent = `Персонаж: ${build.character}`;
        
        // Очистка
        modalItemsGrid.innerHTML = '';
        modalLevelingList.innerHTML = '';
        modalUpList.innerHTML = '';

        let itemsHtml = '';

        // 1. Оружие
        itemsHtml += '<h3 class="item-category-title">Оружие</h3>';
        itemsHtml += '<div class="items-category weapons-grid">';
        build.weapons.forEach(item => {
            itemsHtml += createItemHtml(item, 'weapon');
        });
        itemsHtml += '</div>';

        // 2. Тома
        itemsHtml += '<h3 class="item-category-title">Тома</h3>';
        itemsHtml += '<div class="items-category tomes-grid">';
        build.tomes.forEach(item => {
            itemsHtml += createItemHtml(item, 'tome');
        });
        itemsHtml += '</div>';

        itemsHtml += '<h3 class="item-category-title">Основные Айтемы</h3>';
        itemsHtml += '<div class="items-category gear-grid">';
        build.gear.forEach(item => {
            itemsHtml += createItemHtml(item, 'gear');
        });
        itemsHtml += '</div>';
        
        modalItemsGrid.innerHTML = itemsHtml; // Заполнение грида

        build.leveling.forEach(step => {
            modalLevelingList.innerHTML += `<li>${step}</li>`;
        });

        build.Up.forEach(Up => {
            modalUpList.innerHTML += `<li>${Up}</li>`;
        });

        modalTipsContent.textContent = build.tips;
    };

    const openModal = (buildId) => {
        const build = BUILDS_DATA[buildId];
        if (build) {
            const cardElement = buildsGrid.querySelector(`[data-build-id="${buildId}"]`);
            const buildTitle = cardElement.querySelector('.build-card__title').textContent;
            
            fillModal(build, buildTitle);
            modalOverlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        modalOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
    };

    const applyFilters = () => {
        const searchText = searchInput.value.toLowerCase();
        const selectedChar = charSelect.value;
        const selectedTier = tierSelect.value;

        Array.from(buildsGrid.children).forEach(card => {
            
            const cardTitle = card.querySelector('.build-card__title').textContent.toLowerCase();
            const cardChar = card.getAttribute('data-char'); 
            const cardGoal = card.getAttribute('data-goal');
            const cardTier = card.getAttribute('data-tier'); 
            
            const matchesSearch = cardTitle.includes(searchText) || (cardChar && cardChar.includes(searchText));
            const matchesChar = !selectedChar || cardChar === selectedChar;
            const matchesTier = !selectedTier || cardTier === selectedTier;

            if (matchesSearch && matchesChar && matchesTier) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    buildsGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.builds__card');
        if (card) {
            const buildId = card.getAttribute('data-build-id');
            openModal(buildId);
        }
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
            closeModal();
        }
    });

    searchInput.addEventListener('input', applyFilters);
    charSelect.addEventListener('change', applyFilters);
    tierSelect.addEventListener('change', applyFilters);
});