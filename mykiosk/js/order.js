

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
        productLength[i].insertAdjacentHTML('beforeend', coffeeImgBox); //이미지
        productLength[i].insertAdjacentHTML('beforeend', coffeeNameBox); // 이름
        productLength[i].insertAdjacentHTML('beforeend', coffeePriceBox) // 가격
    }

    const coffeeImg = document.querySelectorAll('.coffeeImg');
    const coffeeName = document.querySelectorAll('.coffeeName');
    const coffeePrice = document.querySelectorAll('.coffeePrice');
    

    loadJson(function(data){
        jsonData = JSON.parse(data);
        var cnt = 0;
        for(let i in jsonData){ // (이미지주소 , 이름 , 가격 가져오기 ) ( coffeeMenu 의 아이디를 CoffeeData의 name 키값으로함)
            coffeeImg[cnt].src=jsonData[i].img;
            coffeeName[cnt].innerHTML=jsonData[i].name;
            coffeePrice[cnt].innerHTML=jsonData[i].price;
            productLength[cnt].id=i;
            cnt++;
            
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



function order(){
    const Btn = document.querySelectorAll('.coffeeMenu');
    let coffeeName = [];
    loadJson(function(data){ // 제이슨 데이터 추출
        const jsonData = JSON.parse(data);
        let cnt = 0;
        for(let n in jsonData){
            coffeeName[cnt]=jsonData[n].name; // coffeeName 배열에 커피[key].이름을 순서대로
            cnt++;
        }
    });

    for(let i=0; i<Btn.length; i++){
        Btn[i].addEventListener('click',function(e){ //container 를 클릭했을떄
            if(!e.target.id){ // 아이디가 없으면 ( 자식요소이면 )
               
               const tmp = e.target.parentElement.id; // 부모요소의 아이디(커피인덱스) 대입
               const coffeeIndex = tmp.replace('coffee',''); // ex) coffee1 이면 coffee 삭제후 1을 coffeeName[숫자]로 사용하기위해 대입
               localStorage.setItem(e.target.parentElement.id,coffeeName[coffeeIndex]) // coffeeName[인덱스] 로 클릭한 요소에 맞는 커피이름을 스토리지에 저장
            
            }else{ // 부모요소이면.
                const tmp = e.target.id;
                const coffeeIndex = tmp.replace('coffee','');
                localStorage.setItem(e.target.id,coffeeName[coffeeIndex])
            }
        });
    }
}
order();