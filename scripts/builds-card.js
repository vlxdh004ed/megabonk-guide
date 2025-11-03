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

    const BASE_ICONS_PATH = 'images/builds-recourses/';
    
    const getIconFolderPath = (type) => {
        switch (type) {
            case 'weapon':
                return 'weapons-item/';
            case 'tome':
                return 'tome-icons/';
            case 'gear':
                return 'items-icons/';
            default:
                return '';
        }
    };
    // ----------------------

    const BUILDS_DATA = {
        'Noelle-HollyBook': {
            character: 'Ноэль (Noelle)',
            weapons: [
                { icon: 'Frostwalker.png', name: 'Ледяной Странник', description: 'Основное оружие Ноэль' },
                { icon: 'Firewalker.png', name: 'Огненный странник', description: 'Большой урон по области, брать обязательно' },
                { icon: 'Katana.png', name: 'Катана', description: 'Большой дпс на старте дает выживаемость' },
                { icon: 'Dexecutioner.png', name: 'Дексекьюционер', description: 'Урон по небольшой области, есть шанс моментально убить врага' },
            ],
            tomes: [
                { icon: 'CursedTome.png', name: 'Проклятый Том', description: '+ Сложность, + кол-во мобов' },
                { icon: 'XpTome.png', name: 'Том Опыта', description: '+ Увеличение Опыта, брать обязательно' },
                { icon: 'BloodTome.png', name: 'Кровавый Том', description: 'Лайфстил для бука' },
                { icon: 'ChaosTome.png', name: 'Том Хаоса', description: 'Качает случайную характеристику' },
            ],
            gear: [
                { icon: 'ItemHolyBook.png', name: 'Святая Книга', description: '+ 100 макс. хп, +50 регена, реген наносит урон  ' },
            ],
            // ------------------------------------
            leveling: [
                'Для старта ищем кредитку и ключи, раздуваем удачу',
                'До конца второго уровня желательно найти ключевые айтемы билда',
            ],
            Up: [
                'На первых уровнях качаем томы',
                'Параллельно из шрайнов стараемся забирать любой хил',
            ],
            tips: 'Основа билда заключается в том чтобы в лейте быть с раздутым хилом и минимум одной книгой, радиус книги увеличивается за счет пассивки ноэль которая дает +1% размера за каждый уровень, по ходу игры можно найти вилки которые под кевином дают много урона и выживаемости, так же под кевина можно взять голд шилд. На сайте есть гайд <a href="guides/hollyBook-explain.html" class="tip-link">как работает Святая Книга</a>',
        },
        'Robinette-gold': {
            character: 'Робинетта (Robinette)',
            weapons: [
                { icon: 'Bow.png', name: 'Лук', description: 'Основное оружие лучницы' },
                { icon: 'Aura.png', name: 'Аура', description: 'АоЕ урон, дает возможнось не задыхаться в рои' },
                { icon: 'Firewalker.png', name: 'Огненный странник', description: 'Большой урон по АоЕ, брать обязательно' },
                { icon: 'Dexecutioner.png', name: 'Дексекьюционер', description: 'Аое урон, есть шанс моментально убить врага' },
            ],
            tomes: [
                { icon: 'GoldenTome.png', name: 'Золотой Том', description: '+ Увеличение Золота, брать обязательно' },
                { icon: 'XpTome.png', name: 'Том Опыта', description: '+ Увеличение Опыта, брать обязательно' },
                { icon: 'CursedTome.png', name: 'Проклятый Том', description: '+ Сложность, + кол-во мобов' },
                { icon: 'ChaosTome.png', name: 'Том Хаоса', description: 'Качает случайную характеристику' },
            ],
            gear: [
                { icon: 'Kevin.png', name: 'Кевин', description: '25% с каждой тычки наносишь себе урон' },
                { icon: 'ItemGoldenShield.png', name: 'Золотой щит', description: '+ золото, когда получаешь урон' },
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
        'Noelle-base': {
            character: 'Ноэль (Noelle)',
            weapons: [
                { icon: 'Frostwalker.png', name: 'Ледяной Странник', description: 'Основное оружие Ноэль' },
                { icon: 'Firewalker.png', name: 'Огненный странник', description: 'Большой урон по области, брать обязательно' },
                { icon: 'Katana.png', name: 'Катана', description: 'Большой дпс на старте дает выживаемость' },
                { icon: 'Dexecutioner.png', name: 'Дексекьюционер', description: 'Урон по небольшой области, есть шанс моментально убить врага' },
            ],
            tomes: [
                { icon: 'CursedTome.png', name: 'Проклятый Том', description: '+ Сложность, + кол-во мобов' },
                { icon: 'XpTome.png', name: 'Том Опыта', description: '+ Увеличение Опыта, брать обязательно' },
                { icon: 'LuckTome.png', name: 'Том Удачи', description: 'Больше лака' },
                { icon: 'ChaosTome.png', name: 'Том Хаоса', description: 'Качает случайную характеристику' },
            ],
            gear: [
                { icon: 'ItemIceCrystal.png', name: 'Ледяной Кристал', description: 'Хорошо бустит урон на старте, и в миде' },
                { icon: 'ItemIceCube.png', name: 'Ледяной Куб', description: 'Наверное мейн айтем для билда' },
            ],
            // ------------------------------------
            leveling: [
                'С первой локи стараемся выйти с 40 лвл, 80+ сложности, 80+ удачи',
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
        'Megachad-thorns': {
            character: 'Мегачад (Megachad)',
            weapons: [
                { icon: 'Aura.png', name: 'Аура', description: 'Основное оружие Чада' },
                { icon: 'Egida.png', name: 'Эгида', description: 'Чтобы жить' },
                { icon: 'Bluetooth Knife.png', name: 'Беспроводной кинжал', description: 'Брать во второй слот, изи прохождение первой локи' },
                { icon: 'Katana.png', name: 'Катана', description: 'Большой дпс со старта' },
            ],
            tomes: [
                { icon: 'ArmorTome.png', name: 'Том Армора', description: 'Больше армора, обязательно для билда' },
                { icon: 'ThornsTome.png', name: 'Том Шипов', description: 'Так же основа билда' },
                { icon: 'XpTome.png', name: 'Том Опыта', description: '+ Опыт' },
                { icon: 'CursedTome.png', name: 'Проклятый Том', description: '+ Кол-во мобов - больше опыта' },
            ],
            gear: [
                { icon: 'ItemCactus.png', name: 'Кактус', description: 'Выстреливает шипами при получении урона, урон так же зависит от шипов' },
                { icon: 'Kevin.png', name: 'Кевин', description: 'Синергия с кактусом, основа билда' },
                { icon: 'ItemSpikyShieldf.png', name: 'Щит с Шипами', description: '+2 шипы за каждый % армора, синергия с томом на армор' },
            ],
            // ------------------------------------
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
        'Vlad-bloodmarks': {
            character: 'Влад (Vlad)',
            weapons: [
                { icon: 'BloodMagic.png', name: 'Кровавая Магия', description: 'Основное оружие Влада' },
                { icon: 'Aura.png', name: 'Аура', description: 'АоЕ урон, дает возможнось не задыхаться во время волн' },
                { icon: 'Firewalker.png', name: 'Огненный странник', description: 'Большой урон по АоЕ, брать обязательно' },
                { icon: 'Dexecutioner.png', name: 'Дексекьюционер', description: 'Аое урон, есть шанс моментально убить врага' },
            ],
            tomes: [
                { icon: 'XpTome.png', name: 'Том Опыта', description: '+ Увеличение Опыта, брать обязательно' },
                { icon: 'CursedTome.png', name: 'Проклятый Том', description: '+ Сложность, + кол-во мобов' },
                { icon: 'BloodTome.png', name: 'Кровавый том', description: 'Лайфстил' },
                { icon: 'ChaosTome.png', name: 'Том Хаоса', description: 'Качает случайную характеристику' },
            ],
            gear: [
                { icon: 'Bloody Cleaver.png', name: 'Кровавый топорик', description: 'Лайфстил тригерит блудмарки, так +50% накинуть блудмарку' },
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
    };


    const createItemHtml = (item, type) => {
        const folder = getIconFolderPath(type);
        const fullPath = BASE_ICONS_PATH + folder + item.icon;
        
        return `
            <div class="build-details__item-detail ${type}">
                <div class="icon" style="background-image: url('${fullPath}');"></div> 
                <div class="name">${item.name}</div>
                <div class="description">${item.description}</div>
            </div>
        `;
    };

    const fillModal = (build, title) => {
        modalTitle.textContent = `${title}`;
        modalCharName.textContent = `Персонаж: ${build.character}`;
        
        modalItemsGrid.innerHTML = '';
        modalLevelingList.innerHTML = '';
        modalUpList.innerHTML = '';

        let itemsHtml = '';

        itemsHtml += '<h3 class="item-category-title">Оружие</h3>';
        itemsHtml += '<div class="items-category weapons-grid">';
        build.weapons.forEach(item => {
            itemsHtml += createItemHtml(item, 'weapon');
        });
        itemsHtml += '</div>';

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
        
        modalItemsGrid.innerHTML = itemsHtml;


        build.leveling.forEach(step => {
            modalLevelingList.innerHTML += `<li>${step}</li>`;
        });

        build.Up.forEach(Up => {
            modalUpList.innerHTML += `<li>${Up}</li>`;
        });

        modalTipsContent.innerHTML = build.tips;
    };

    const openModal = (buildId) => {
        const build = BUILDS_DATA[buildId];
        if (build) {
            const cardElement = buildsGrid.querySelector(`[data-build-id="${buildId}"]`);
            const titleElement = cardElement ? cardElement.querySelector('.build-card__title') : null;
            const buildTitle = titleElement ? titleElement.textContent : 'Название Билда';
            
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

        Array.from(buildsGrid.children).forEach(card => {
            
            const cardTitle = card.querySelector('.build-card__title').textContent.toLowerCase();
            const cardChar = card.getAttribute('data-char'); 
            
            const matchesSearch = cardTitle.includes(searchText) || (cardChar && cardChar.toLowerCase().includes(searchText));
            const matchesChar = !selectedChar || selectedChar === 'все персонажи' || cardChar === selectedChar;

            if (matchesSearch && matchesChar) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    buildsGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.build-card');
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
});