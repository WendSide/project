
// После переделки карточки и их отправления из бд доделать избранное авто


async function sendCarData(id, mark) {
    let url = `http://localhost/myserver/post.php?mark=${encodeURIComponent(mark)}&model=${encodeURIComponent(model)}&release=${encodeURIComponent(release)}&price=${encodeURIComponent(price)}&mileage=${encodeURIComponent(mileage)}&ecapacity=${encodeURIComponent(ecapacity)}&transmission=${encodeURIComponent(transmission)}&condition=${encodeURIComponent(condition)}&numberowners=${encodeURIComponent(numberowners)}&description=${encodeURIComponent(description)}&sity=${encodeURIComponent(sity)}&numberphone=${encodeURIComponent(numberphone)}&owner=${encodeURIComponent(owner)}`;
    
    try {
        let response = await fetch(url);
        let result = await response.json();
        
        if (result.success) {
            alert('Объявление добавлено в избранное!');
            window.location.href = 'header.html';
        } else {
            alert('Неизвестная ошибка: ' + result.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером!');
    }
}

document.getElementById('carPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные
    const id = document.getElementById('id').value.trim();
    const mark = document.getElementById('mark').value.trim();

    // Отправляем
    sendCarData(id, mark);
});