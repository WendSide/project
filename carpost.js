async function id_to_server(id, obj_dom) {
	let url = `http://localhost/myserver/carpost.php/get?id=${id}`
	let response = await fetch(url, {
		method: 'GET',
		headers: { Accept: 'application/json' },
	})

	let param = await response.json()

	obj_dom.innerHTML = param[0].mark
    obj_dom.innerHTML = param[1].model
	obj_dom.classList.add('active')

}


;[...document.querySelectorAll('a')].forEach((item, index) => {
	item.addEventListener('click', e => {
		let id = item.dataset.id
		let block_content = document.querySelectorAll('.block_content')
		for (var i = 0; i < block_content.length; i++) {
			if (block_content[i].classList.contains('active')) {
				block_content[i].classList.remove('active')
			}
		}
		id_to_server(id, block_content[index])
	})
})
