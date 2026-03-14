document.addEventListener('DOMContentLoaded', function() {
    // ========== КАРУСЕЛИ ==========
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const zones = carousel.querySelectorAll('.hover-zone');
        let currentIndex = 0;
        let timeoutId;
        
        // Функция показа слайда по индексу
        function showSlide(index) {
            if (index < 0) index = 0;
            if (index >= slides.length) index = slides.length - 1;
            
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentIndex = index;
        }
        
        // Обработка наведения на зоны
        zones.forEach((zone, zoneIndex) => {
            zone.addEventListener('mouseenter', () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                showSlide(zoneIndex);
            });
        });
        
        // Возврат к первому слайду через 3 секунды после ухода мыши
        carousel.addEventListener('mouseleave', () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            
            timeoutId = setTimeout(() => {
                showSlide(0);
            }, 3000);
        });
        
        // Обработка клика по индикаторам
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(index);
                
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            });
        });
        
        // Предотвращаем срабатывание mouseleave при наведении на индикаторы
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        if (indicatorsContainer) {
            indicatorsContainer.addEventListener('mouseenter', () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            });
        }
    });

    // ========== ФИЛЬТРЫ ==========
    
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
            const message = document.createElement('div');
            message.id = 'no-results-message';
            message.style.cssText = 'text-align: center; padding: 40px; background: white; border-radius: 10px; font-size: 18px; color: #666;';
            message.textContent = 'По вашему запросу ничего не найдено';
            carsContainer.appendChild(message);
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
            const minPrice = minPriceInput.value ? parseInt(minPriceInput.value) : null;
            const maxPrice = maxPriceInput.value ? parseInt(maxPriceInput.value) : null;
            
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

    // Инициализация - показываем все машины
    applyFilters();
});

// ========== РЕГИСТРАЦИЯ ==========
// Этот код выполняется только на странице регистрации
if (document.getElementById('registrationForm')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('registrationForm');
        const loginInput = document.getElementById('login');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const agreementCheckbox = document.getElementById('agreement');
        const submitButton = document.querySelector('.register-btn');
        const loginMessage = document.getElementById('res');

        // Функция для валидации логина
        function validateLogin() {
            const login = loginInput.value.trim();
            const loginRegex = /^[a-zA-Z0-9]+$/;
            
            if (login.length === 0) {
                showMessage(loginMessage, '', '');
                return false;
            } else if (login.length < 12) {
                showMessage(loginMessage, 'Логин должен содержать минимум 12 символов', 'error');
                return false;
            } else if (!loginRegex.test(login)) {
                showMessage(loginMessage, 'Логин может содержать только буквы и цифры', 'error');
                return false;
            } else {
                showMessage(loginMessage, '✓ Логин корректный', 'success');
                return true;
            }
        }

        // Функция для валидации email
        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email.length === 0) {
                setCustomValidityMessage(emailInput, '');
                return false;
            } else if (!emailRegex.test(email)) {
                setCustomValidityMessage(emailInput, 'Введите корректный email (например, name@domain.com)');
                return false;
            } else {
                setCustomValidityMessage(emailInput, '');
                return true;
            }
        }

        // Функция для валидации пароля
        function validatePassword() {
            const password = passwordInput.value;
            
            if (password.length === 0) {
                setCustomValidityMessage(passwordInput, '');
                return false;
            } else if (password.length < 8) {
                setCustomValidityMessage(passwordInput, 'Пароль должен содержать минимум 8 символов');
                return false;
            } else {
                setCustomValidityMessage(passwordInput, '');
                return true;
            }
        }

        // Функция для валидации подтверждения пароля
        function validateConfirmPassword() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (confirmPassword.length === 0) {
                setCustomValidityMessage(confirmPasswordInput, '');
                return false;
            } else if (password !== confirmPassword) {
                setCustomValidityMessage(confirmPasswordInput, 'Пароли не совпадают');
                return false;
            } else {
                setCustomValidityMessage(confirmPasswordInput, '');
                return true;
            }
        }

        function showMessage(element, text, type) {
            element.textContent = text;
            element.className = 'validation-message ' + (type ? type : '');
        }

        function setCustomValidityMessage(input, message) {
            input.setCustomValidity(message);
            if (message) {
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#ddd';
            }
        }

        function checkFormValidity() {
            const isLoginValid = validateLogin();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmValid = validateConfirmPassword();
            const isAgreed = agreementCheckbox.checked;

            submitButton.disabled = !(isLoginValid && isEmailValid && isPasswordValid && isConfirmValid && isAgreed);
        }

        loginInput.addEventListener('input', function() {
            validateLogin();
            checkFormValidity();
        });

        emailInput.addEventListener('input', function() {
            validateEmail();
            checkFormValidity();
        });

        passwordInput.addEventListener('input', function() {
            validatePassword();
            if (confirmPasswordInput.value.length > 0) {
                validateConfirmPassword();
            }
            checkFormValidity();
        });

        confirmPasswordInput.addEventListener('input', function() {
            validateConfirmPassword();
            checkFormValidity();
        });

        agreementCheckbox.addEventListener('change', function() {
            checkFormValidity();
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const isLoginValid = validateLogin();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmValid = validateConfirmPassword();
            const isAgreed = agreementCheckbox.checked;

            if (isLoginValid && isEmailValid && isPasswordValid && isConfirmValid && isAgreed) {
                alert('Регистрация прошла успешно!');
            } else {
                alert('Пожалуйста, исправьте ошибки в форме.');
            }
        });

        checkFormValidity();
    });
}