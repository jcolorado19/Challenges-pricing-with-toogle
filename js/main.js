const tooglePrice = document.querySelector('.switchButton input'),
    year = document.querySelector('.year'),
    month = document.querySelector('.month'),
    prices = document.querySelectorAll('.card__header--price');

let listPricesDollar = [199.99, 249.99, 399.99],
    nodeList = [...prices],
    basePrice = 'USD',
    converPrice = 'MXN';

async function fetchDataConvert() {
    const response = await fetch(
            `https://api.exchangeratesapi.io/latest?base=${basePrice}&symbols=${converPrice}`,
        ),
        data = await response.json();

    const listPrices = [],
        money = data.rates.MXN;

    for (let i = 0; i < listPricesDollar.length; i++) {
        listPrices.push(listPricesDollar[i] * money);
        // console.log(listPrices[i]);
    }

    for (let i = 0; i < listPrices.length; i++) {
        console.log(listPrices[i]);
    }

    function showPrices() {
        for (let i = 0; i < listPrices.length; i++) {
            nodeList[i].innerHTML = formatPrice(listPrices[i]);
        }
    }

    showPrices();

    tooglePrice.addEventListener('change', function () {
        if (this.checked) {
            year.classList.remove('active');
            month.classList.add('active');

            for (let i = 0; i < listPrices.length; i++) {
                let newPrices = listPrices[i] / 10;
                nodeList[i].innerHTML = formatPrice(trunc(newPrices));
            }
        } else {
            year.classList.add('active');
            month.classList.remove('active');

            showPrices();
        }
    });
}

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'MXN',
    }).format(price);
    return newPrice;
};

function trunc(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return Number(t.match(regex)[0]);
}

fetchDataConvert();
