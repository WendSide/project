// Загружаем все машины сразу при загрузке страницы
async function loadCars() {
    let response = await fetch('http://localhost/myserver/carpost.php');
    let cars = await response.json();
    
    let container = document.getElementById('carsContainer');
    container.innerHTML = '';
    
    for (let car of cars) {
        container.innerHTML += `
            <div class="car-item">
                <div class="car-image">🚗</div>
                <div class="car-info">
                    <h2 class="car-name">${car.mark} ${car.model}</h2>
                    <div class="car-price">${Number(car.price).toLocaleString()} ₽</div>
                    <div class="car-specs">
                        <div><span class="spec-label">Год:</span> <span class="spec-value">${car.release}</span></div>
                        <div><span class="spec-label">Пробег:</span> <span class="spec-value">${Number(car.mileage).toLocaleString()} км</span></div>
                        <div><span class="spec-label">Мощность:</span> <span class="spec-value">${car.ecapacity} л.с.</span></div>
                        <div><span class="spec-label">Коробка:</span> <span class="spec-value">${car.transmission}</span></div>
                        <div><span class="spec-label">Состояние:</span> <span class="spec-value">${car.condition}</span></div>
                        <div><span class="spec-label">Владельцев:</span> <span class="spec-value">${car.numberowners}</span></div>
                    </div>
                    <div class="car-description">${car.description || 'Описание отсутствует'}</div>
                </div>
                <div class="seller-info">
                    👤 ${car.owner || 'Продавец'} | 📞 ${car.numberphone || 'нет телефона'}
                </div>
            </div>
        `;
    }
}

loadCars();