// ========== ФИЛЬТРЫ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Элементы фильтров
    const cars = document.querySelectorAll('.car-item');
    const filterLinks = document.querySelectorAll('.filter-list a');
    const searchInput = document.getElementById('searchInput');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const applyPriceBtn = document.getElementById('applyPriceFilter');
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    // Объект для хранения активных фильтров
    let activeFilters = {
        model: null,
        body: null,
        transmission: null,
        drive: null,
        search: '',
        minPrice: null,
        maxPrice: null
    };

    // Функция применения всех фильтров
    function applyFilters() {
        let visibleCount = 0;
        
        cars.forEach(car => {
            let show = true;
            
            // Фильтр по модели
            if (activeFilters.model && car.dataset.model !== activeFilters.model) {
                show = false;
            }
            
            // Фильтр по кузову
            if (show && activeFilters.body && car.dataset.body !== activeFilters.body) {
                show = false;
            }
            
            // Фильтр по коробке передач
            if (show && activeFilters.transmission && car.dataset.transmission !== activeFilters.transmission) {
                show = false;
            }
            
            // Фильтр по приводу
            if (show && activeFilters.drive && car.dataset.drive !== activeFilters.drive) {
                show = false;
            }
            
            // Поиск по названию
            if (show && activeFilters.search) {
                const carName = car.querySelector('.car-name').textContent.toLowerCase();
                if (!carName.includes(activeFilters.search.toLowerCase())) {
                    show = false;
                }
            }
            
            // Фильтр по цене
            if (show) {
                const price = parseInt(car.dataset.price);
                
                if (activeFilters.minPrice !== null && price < activeFilters.minPrice) {
                    show = false;
                }
                
                if (show && activeFilters.maxPrice !== null && price > activeFilters.maxPrice) {
                    show = false;
                }
            }
            
            // Показать или скрыть автомобиль
            if (show) {
                car.style.display = 'flex';
                visibleCount++;
            } else {
                car.style.display = 'none';
            }
        });
        
        // Обновление подсветки активных фильтров
        updateActiveFiltersHighlight();
        
        // Показать сообщение, если ничего не найдено
        showNoResultsMessage(visibleCount);
    }

    // Функция обновления подсветки активных фильтров
    function updateActiveFiltersHighlight() {
        // Сначала убираем подсветку у всех
        filterLinks.forEach(link => {
            link.classList.remove('active-filter');
        });
        
        // Подсвечиваем активные
        filterLinks.forEach(link => {
            const filterType = link.closest('ul').dataset.filter;
            const filterValue = link.dataset.value;
            
            if (activeFilters[filterType] === filterValue) {
                link.classList.add('active-filter');
            }
        });
    }

    // Функция показа сообщения "ничего не найдено"
    function showNoResultsMessage(count) {
        // Удаляем старое сообщение, если есть
        const oldMessage = document.getElementById('no-results-message');
        if (oldMessage) {
            oldMessage.remove();
        }
        
        // Если ничего не найдено, показываем сообщение
        if (count === 0) {
            const carsContainer = document.getElementById('carsContainer');
            if (carsContainer) {
                const message = document.createElement('div');
                message.id = 'no-results-message';
                message.style.cssText = 'text-align: center; padding: 40px; background: white; border-radius: 10px; font-size: 18px; color: #666;';
                message.textContent = 'По вашему запросу ничего не найдено';
                carsContainer.appendChild(message);
            }
        }
    }

    // Обработчики для фильтров по категориям
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filterType = this.closest('ul').dataset.filter;
            const filterValue = this.dataset.value;
            
            // Если фильтр уже активен, сбрасываем его
            if (activeFilters[filterType] === filterValue) {
                activeFilters[filterType] = null;
            } else {
                // Иначе устанавливаем новый
                activeFilters[filterType] = filterValue;
            }
            
            applyFilters();
        });
    });

    // Обработчик поиска
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            activeFilters.search = this.value.trim();
            applyFilters();
        });
    }

    // Обработчик применения ценового фильтра
    if (applyPriceBtn) {
        applyPriceBtn.addEventListener('click', function() {
            const minPrice = minPriceInput && minPriceInput.value ? parseInt(minPriceInput.value) : null;
            const maxPrice = maxPriceInput && maxPriceInput.value ? parseInt(maxPriceInput.value) : null;
            
            activeFilters.minPrice = minPrice;
            activeFilters.maxPrice = maxPrice;
            
            applyFilters();
        });
    }

    // Обработчик сброса всех фильтров
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Сбрасываем все фильтры
            activeFilters = {
                model: null,
                body: null,
                transmission: null,
                drive: null,
                search: '',
                minPrice: null,
                maxPrice: null
            };
            
            // Очищаем поля ввода
            if (searchInput) searchInput.value = '';
            if (minPriceInput) minPriceInput.value = '';
            if (maxPriceInput) maxPriceInput.value = '';
            
            applyFilters();
        });
    }

    // ========== КАРУСЕЛЬ ==========
    // Функция для инициализации карусели
    function initCarousel(carouselId) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        
        const zones = carousel.querySelectorAll('.hover-zone');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        
        // Функция для переключения слайда
        function showSlide(index) {
            // Скрываем все слайды
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Убираем активный класс у индикаторов
            indicators.forEach(ind => {
                ind.classList.remove('active');
            });
            
            // Показываем нужный слайд и активируем индикатор
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
        }
        
        // Добавляем обработчики для зон наведения
        zones.forEach((zone, index) => {
            zone.addEventListener('mouseenter', () => {
                showSlide(index);
            });
        });
        
        // Добавляем обработчики для индикаторов
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
            
            indicator.addEventListener('mouseenter', () => {
                showSlide(index);
            });
        });
    }

    // Инициализируем все карусели
    for (let i = 1; i <= 6; i++) {
        initCarousel(`carousel${i}`);
    }


});
