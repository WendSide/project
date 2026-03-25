async function fetchData(nickname, name, famaly, ote, birthay, email, pass) {
	let url = `http://localhost/myserver/?nickname=${encodeURIComponent(nickname)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&famaly=${encodeURIComponent(famaly)}&ote=${encodeURIComponent(ote)}&birthay=${encodeURIComponent(birthay)}&pass=${encodeURIComponent(pass)}`
	let response = await fetch(url, {
	  method: 'GET',
	  headers: { Accept: 'application/json' },
	})
  
	// Можно обработать ответ, например:
	// let param = await response.json()
	// console.log(param)
  }
  
  function get_data_form() {
	const btn_reg = document.querySelector('#btn_reg')
	btn_reg.addEventListener('click', event => {
	  event.preventDefault() // Предотвращение отправки формы по умолчанию
  
	  const nickname = document.querySelector('#nickname').value.trim()
	  const email = document.querySelector('#exampleInputEmail').value.trim()
	  const name = document.querySelector('#exampleInputName').value.trim()
	  const famaly = document.querySelector('#exampleInputFamaly').value.trim()
	  const ote = document.querySelector('#exampleInputOte').value.trim()
	  const birthay = document.querySelector('#exampleInputBirthay').value.trim()
	  const pass = document.querySelector('#exampleInputPassword1').value.trim()
  
	  // Регулярное выражение для проверки email
	  const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
	  // Простая проверка: все поля должны быть не пустыми
	  if (!nickname || !email || !name || !famaly || !ote || !birthay || !pass ) {
		console.log('Ложно')
		return
	  }

	//   // Подтверждение пароля
    //   if(typeof nameValue !== "string"){
    //     window.alert("Пожалуйста повторите вашь пароль")
    //   // we use strict validation ( !== ) because it's a good practice.
    //   }else if(passValue !== confpassValue) {
    //    window.alert("Пароли не совпадают!")
    // }


	  // Проверка email 
	  if (emailExp.test(email)) {
		console.log('Email валиден, отправляем данные')
		fetchData(nickname, name, famaly, ote, birthay, email, pass)
	  } else {
		console.log('Истино')
	  }
	})
  }
  
  document.addEventListener('DOMContentLoaded', function () {
	get_data_form()
  })




  function openbox(box){
	display = document.getElementById('box').style.display;
	if (display = 'none'){
		document.getElementById('box').style.display = "block";
	}else
	{
		document.getElementById('box').style.display = "none";
	}
}
