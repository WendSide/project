async function fetchAndDisplayGraphicsCards() {
    const mainTovarDiv = document.querySelector('.main_tovar');
    if (!mainTovarDiv) {
        console.error("Element .main_tovar not found!");
        return;
    }

    try {
        const url = 'http://localhost/myserver/carpost.php';
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const graphicsCards = await response.json();
        displayGraphicsCards(graphicsCards);
        addBuyButtonListeners(); 

    } catch (error) {
        console.error("Error fetching graphics cards:", error);
        mainTovarDiv.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
}


function displayGraphicsCards(cards) {
    const mainTovarDiv = document.querySelector('.main_tovar'); 
    if (!mainTovarDiv) {
        console.error("Element .main_tovar not found!");
        return;
    }

    mainTovarDiv.innerHTML = ''; 

    if (!Array.isArray(cards) || cards.length === 0) {
        mainTovarDiv.innerHTML = '<p>No graphics cards found.</p>';
        return;
    }

    cards.forEach(card => {
        const productBlock = document.createElement('div');
        productBlock.className = 'productsblocks'; 
        productBlock.innerHTML = `
            <div class="graphicscardimg">
                <img src="${card.img}" alt="${card.brand}">
            </div>
            <div class="graphicscardtext">
                <h1>${card.brand}</h1>
            </div>
            <div class="graphicscardprice">
                <h2>${card.price} ₽</h2>
                <div class="buybutton">
                    <button type="button" class="primenit_btn" id="buy_btn_${card.id}">Buy</button>
                </div>
                <div class="graphicscardrating">
                    <h1>Reviews:<img src="temp_imgs/image (10).png"> ${card.rating}</h1>
                </div>
            </div>
        `;
        mainTovarDiv.appendChild(productBlock);
    });
}
