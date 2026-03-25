async function fetchData(nickname, email, pass) {
    let url = `http://localhost/myserver/?nickname=${encodeURIComponent(nickname)}&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`
    
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        
        // Проверяем успешность запроса
        if (response.ok) {
            // Перенаправляем на страницу header.html
            window.location.href = 'header.html';
        } else {
            console.log('Ошибка при регистрации');
            alert('Произошла ошибка при регистрации. Попробуйте еще раз.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
}

function get_data_form() {
    const btn_reg = document.querySelector('#btn_reg')
    btn_reg.addEventListener('click', event => {
        event.preventDefault() // Предотвращение отправки формы по умолчанию

        const nickname = document.querySelector('#nickname').value.trim()
        const email = document.querySelector('#exampleInputEmail').value.trim()
        const pass = document.querySelector('#exampleInputPassword1').value.trim()
        const confirmPass = document.querySelector('#exampleInputConfirmPassword').value.trim() // Добавьте поле для подтверждения пароля

        // Регулярное выражение для проверки email
        const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        // Проверка: все поля должны быть не пустыми
        if (!nickname || !email || !pass || !confirmPass) {
            alert('Пожалуйста, заполните все поля');
            console.log('Не все поля заполнены');
            return
        }

        // Проверка совпадения паролей
        if (pass !== confirmPass) {
            alert('Пароли не совпадают!');
            console.log('Пароли не совпадают');
            return;
        }

        // Проверка длины пароля (опционально)
        if (pass.length < 6) {
            alert('Пароль должен содержать минимум 6 символов');
            return;
        }

        // Проверка email 
        if (!emailExp.test(email)) {
            alert('Введите корректный email адрес');
            console.log('Email не валиден');
            return;
        }

        // Если все проверки пройдены, отправляем данные
        console.log('Все данные валидны, отправляем на сервер');
        fetchData(nickname, email, pass);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    get_data_form()
})

function openbox(box) {
    // Исправленная функция openbox
    let boxElement = document.getElementById('box');
    if (boxElement.style.display === 'none' || boxElement.style.display === '') {
        boxElement.style.display = "block";
    } else {
        boxElement.style.display = "none";
    }
}