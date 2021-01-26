const tooglePrice = document.querySelector('.switchButton input'),
    year = document.querySelector('.year'),
    month = document.querySelector('.month'),
    prices = document.querySelectorAll('.card__header--price');

const listPrices = [199.99, 249.99, 399.99];
const nodeList = [...prices];

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
    return newPrice;
};

showPrices();

// function trunc(n, position) {
//     var s = n.toString();
//     var decimalLength = s.indexOf('.') + 1;
//     var numStr = s.substr(0, decimalLength + position);
//     return Number(numStr);
// }

function trunc(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return Number(t.match(regex)[0]);
}

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

function showPrices() {
    for (let i = 0; i < listPrices.length; i++) {
        nodeList[i].innerHTML = formatPrice(listPrices[i]);
    }
}
