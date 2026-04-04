async function sendCarData(mark, model, release, price, mileage, ecapacity, transmission, condition, numberowners, description, sity, numberphone, owner) {
    let url = `http://localhost/myserver/post.php?mark=${encodeURIComponent(mark)}&model=${encodeURIComponent(model)}&release=${encodeURIComponent(release)}&price=${encodeURIComponent(price)}&mileage=${encodeURIComponent(mileage)}&ecapacity=${encodeURIComponent(ecapacity)}&transmission=${encodeURIComponent(transmission)}&condition=${encodeURIComponent(condition)}&numberowners=${encodeURIComponent(numberowners)}&description=${encodeURIComponent(description)}&sity=${encodeURIComponent(sity)}&numberphone=${encodeURIComponent(numberphone)}&owner=${encodeURIComponent(owner)}`;
    
    try {
        let response = await fetch(url);
        let result = await response.json();
        
        if (result.success) {
            alert('Объявление успешно опубликовано!');
            window.location.href = 'header.html';
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
}

document.getElementById('carPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные
    const mark = document.getElementById('mark').value.trim();
    const model = document.getElementById('model').value.trim();
    const release = document.getElementById('release').value;
    const price = document.getElementById('price').value;
    const mileage = document.getElementById('mileage').value;
    const ecapacity = document.getElementById('ecapacity').value;
    const transmission = document.getElementById('transmission').value;
    const condition = document.getElementById('condition').value;
    const numberowners = document.getElementById('numberowners').value;
    const description = document.getElementById('description').value.trim();
    const sity = document.getElementById('sity').value.trim();
    const numberphone = document.getElementById('numberphone').value.trim();
    const owner = document.getElementById('owner').value.trim();
    
    // Валидация
    if (!mark || !model || !release || !price || !condition || !sity || !numberphone || !owner) {
        alert('Заполните все обязательные поля!');
        return;
    }
    
    // Отправляем
    sendCarData(mark, model, release, price, mileage, ecapacity, transmission, condition, numberowners, description, sity, numberphone, owner);
});