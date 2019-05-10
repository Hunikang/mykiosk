

function loadJson(callback){ //에이젝스

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'CoffeeData.json', true);
    xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState == 4){
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

function init(){ //에이젝스호출

    loadJson(function(data){

        var jsonData = JSON.parse(data);
        for(var n in jsonData){
            console.log(jsonData[n].name);
        }

    });
}

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

var slide1 = new Vue({
    el: '.slide1',
    components: {
        'show': Product,
    }
});

var slide2 = new Vue({
    el: '.slide2',
    components: {
        'show': Product,
    }
});

var slide3 = new Vue({
    el: '.slide3',
    components: {
        'show': Product,
    }
});




function initProduct() { //상품목록 업데이트
    const productLength = document.querySelectorAll('.coffeeMenu');
    const coffeeImgBox = "<img class='coffeeImg'src='#'>"
    const coffeeNameBox = "<span class='coffeeName'></span>";
    const coffeePriceBox = "<span class='coffeePrice'></span>";
    var jsonData;
   
    for (let i = 0; i < productLength.length; i++) {
        productLength[i].insertAdjacentHTML('beforeend', coffeeImgBox);
        productLength[i].insertAdjacentHTML('beforeend', coffeeNameBox);
        productLength[i].insertAdjacentHTML('beforeend', coffeePriceBox)
    }

    const coffeeImg = document.querySelectorAll('.coffeeImg');
    const coffeeName = document.querySelectorAll('.coffeeName');
    const coffeePrice = document.querySelectorAll('.coffeePrice');

    loadJson(function(data){
        jsonData = JSON.parse(data);
        var cnt = 0;
        for(let i in jsonData){ // 이미지주소 , 이름 , 가격 뿌려주기
            coffeeImg[cnt].src=jsonData[i].img;
            coffeeName[cnt].innerHTML=jsonData[i].name;
            coffeePrice[cnt].innerHTML=jsonData[i].price;
            cnt++;
            console.log(jsonData[i].img);
        }
        
    });

  
}
initProduct();


function BtnEvent(btn) { //버튼 누를때 애니메이션
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