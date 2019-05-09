

const coffeeList = [
    ''
]




const Product = {
    template: `
    <div class="coffeeMenuRow01">
        <div class="coffeeMenu"></div>
        <div class="coffeeMenu"></div>
        <div class="coffeeMenu"></div>
        <div class="coffeeMenu"></div>
        <div class="coffeeMenu"></div>
        <div class="coffeeMenu"></div>
    </div>
    `
}

var a = new Vue({
    el: '.slide1',
    components: {
        'show': Product,
    }
});

var b = new Vue({
    el: '.slide2',
    components: {
        'show': Product,
    }
});

var c = new Vue({
    el: '.slide3',
    components: {
        'show': Product,
    }
});

function initProduct() {
    const img = [];
    const productLength = document.querySelectorAll('.coffeeMenu');
    const div = "<img class='coffeeImg'src='#'>"

    for (let i = 0; i < productLength.length; i++) {
        img[i] = './img/coffe' + i + '.png';
        productLength[i].insertAdjacentHTML('beforeend', div);
    }

    const coffeeImg = document.querySelectorAll('.coffeeImg');

    for (let i = 0; i < productLength.length; i++) {
        coffeeImg[i].src = img[i];
      
    }
}
initProduct();


function BtnEvent(btn) {
    const prevBtn = document.querySelector('#headerPrev');
    const NextBtn = document.querySelector('#headerNext');

    prevBtn.addEventListener('click', function () {

        prevBtn.style.transform = "scale(0.9)";
        setTimeout(function () {
            prevBtn.style.transform = "scale(1)";
        }, 100);

    });
    NextBtn.addEventListener('click', function () {

        NextBtn.style.transform = "scale(0.9)";
        setTimeout(function () {
            NextBtn.style.transform = "scale(1)";
        }, 100);

    });

}
BtnEvent();