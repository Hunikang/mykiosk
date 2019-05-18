/*
 * author : kang jihoon
 * email : snowleopard902@gmail.com
 *
 *
 */

 
var orderList = [] // 주문이 담기는 배열 선언
var g_coffee; // 커피 json 저장하는 변수
var g_drink;
var g_dessert;


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

function BtnEvent() { //버튼 누를때 애니메이션
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

function initAllProduct(jsonSrc){ // 상품데이터 불러오기
  
    function loadJson(callback) { //에이젝스
  
      var xhr = new XMLHttpRequest();
      xhr.open('GET', jsonSrc, true);
    
      xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
          callback(xhr.response,xhr.responseURL);
           
          
        }
      }
      xhr.send();
    }
  
    loadJson(function (data,url) {
     
      if(url.indexOf('CoffeeData.json')!=-1){
        g_coffee = JSON.parse(data);
        console.log('커피데이터 등록 완료');
        
   
      }else if(url.indexOf('dessert.json')!=-1){
        g_dessert = JSON.parse(data);
        console.log('디저트등록완료');
        
   
      }else if(url.indexOf('drinkData.json')!=-1){
        g_drink = JSON.parse(data);
        console.log('음료등록완료');
        
   
      }else{
        console.log('잘못된 접근 입니다');
      }
  
    });
  
    
  }
  initAllProduct('CoffeeData.json');
  initAllProduct('dessert.json');
  initAllProduct('drinkData.json');
  window.onload=function(){
    defalutProductInit();
  }
 
  


  function defalutProductInit() { //상품목록 업데이트
    
    const productLength = document.querySelectorAll('.coffeeMenu'); //coffeeMenu 총 길이
    const coffeeImgBox = "<img class='coffeeImg'src='#'>" // 커피이미지
    const coffeeNameBox = "<span class='coffeeName'></span>"; // 커피이름
    const coffeePriceBox = "<span class='coffeePrice'><span>원</span></span>"; //커피가격
    const coffeeBtn = document.querySelector('#coffeeBtn');
    const dessertBtn = document.querySelector('#dessertBtn');
    const drinkBtn = document.querySelector('#drinkBtn');
  
    for (let i = 0; i < productLength.length; i++) {
      productLength[i].insertAdjacentHTML('beforeend', coffeeImgBox); //이미지
      productLength[i].insertAdjacentHTML('beforeend', coffeeNameBox); // 이름
      productLength[i].insertAdjacentHTML('beforeend', coffeePriceBox) // 가격
    }
  
    const coffeeImg = document.querySelectorAll('.coffeeImg');
    const coffeeName = document.querySelectorAll('.coffeeName');
    const coffeePrice = document.querySelectorAll('.coffeePrice');
    coffeeBtnOn();

    coffeeBtn.addEventListener('click',function(){
        coffeeBtnOn();
    });
    dessertBtn.addEventListener('click',function(){
        dessertBtnOn();
    });
    drinkBtn.addEventListener('click',function(){
        drinkBtnOn();
    });
   
    function coffeeBtnOn(){
        
        let cnt = 0;
        for (let i in g_coffee) {
  
            coffeeImg[cnt].src = g_coffee[i].img;
            coffeeName[cnt].innerHTML = g_coffee[i].name;
            coffeePrice[cnt].innerHTML = g_coffee[i].price;
            productLength[cnt].id = i;
            cnt++;
      
        }
    }
    
    function dessertBtnOn(){
        let cnt=0;
       
        for (let i in g_dessert) {
  
            coffeeImg[cnt].src = g_dessert[i].img;
            coffeeName[cnt].innerHTML = g_dessert[i].name;
            coffeePrice[cnt].innerHTML = g_dessert[i].price;
            productLength[cnt].id = i;
            cnt++;
      
        }
    }

    function drinkBtnOn(){
        let cnt=0;
       
        for (let i in g_drink) {
  
            coffeeImg[cnt].src = g_drink[i].img;
            coffeeName[cnt].innerHTML = g_drink[i].name;
            coffeePrice[cnt].innerHTML = g_drink[i].price;
            productLength[cnt].id = i;
            cnt++;
      
        }
    }
  
    }


    
    menuOn();
    function menuOn(){
        Btn();
    }

function Btn() { // 어느 커피 눌렀는지 알려주는 함수
    const coffeeBtn = document.querySelectorAll('.coffeeMenu');
    for (let i = 0; i < coffeeBtn.length; i++) {
        coffeeBtn[i].addEventListener('click', function (e) {
            if (!e.target.id) {
                const coffeeId = e.target.parentElement.id;
                createMenu(coffeeId);
                console.log(coffeeId);
            } else {
                const coffeeId = e.target.id;
                createMenu(coffeeId);
                console.log(coffeeId);
            }
        });
    }
};
function createMenu(coffeeId){
    function Ajax(callback){
        const xhr = new XMLHttpRequest();
        xhr.open('GET','menuSelecter.html',true);
        xhr.onreadystatechange = function(){
            if(xhr.status == 200 && xhr.readyState == 4){
                callback(xhr.response);
            }
        }
        xhr.send();
    };

    Ajax(function(data){
        const  productOptionData =`<div id="coffeeOption"></div>`;
        const mainWrap = document.querySelector('#mainWrap');

        mainWrap.insertAdjacentHTML('afterbegin', productOptionData);
        const coffeeOption = document.querySelector('#coffeeOption');
        coffeeOption.insertAdjacentHTML('beforeend', data);
        MenuProcess(coffeeId);
        
    });
    
    

};

function MenuProcess(coffeeId){
    const coffeeName = document.querySelector('#menuSelecterCoffeeName'); //커피 이름을 출력하는곳
    const coffeeImg = document.querySelector('#menuSelecterCoffeeImg');
    const coffeePrice = document.querySelector('#alertPrice');
    const iceBtn = document.querySelector('#iceBtn');
    const hotBtn = document.querySelector('#hotBtn');
    const shotBtn = document.querySelector('#shotBtn');
    const syrupBtn = document.querySelector('#syrupBtn');
    const iceIcon = document.querySelector('#Oice');
    const hotIcon = document.querySelector('#Ohot');
    let priceDefalut ;
    let syrupCnt = 1;
    let shotCtn = 1;
    
    if(coffeeId.indexOf('coffee')==0){
        // whatChoice = 1;
        console.log(' 커피아이디 입니다.'+coffeeId);
        coffeePrice.innerHTML = g_coffee[coffeeId].price;
        coffeeImg.src = g_coffee[coffeeId].img;
        coffeeName.innerHTML = g_coffee[coffeeId].name;

    }else if(coffeeId.indexOf('drink')==0){
        // whatChoice = 2;
        console.log(' 드링크아이디 입니다.'+coffeeId);
        coffeePrice.innerHTML = g_drink[coffeeId].price;
        coffeeImg.src = g_drink[coffeeId].img;
        coffeeName.innerHTML = g_drink[coffeeId].name;

    }else if(coffeeId.indexOf('dessert')==0){
        // whatChoice = 3;
        console.log(' 디저트아이디 입니다.'+coffeeId);
        coffeePrice.innerHTML = g_dessert[coffeeId].price;
        coffeeImg.src = g_dessert[coffeeId].img;
        coffeeName.innerHTML = g_dessert[coffeeId].name;

    }else{
        console.log(' 잘못 된 접근입니다.');
    }
      
    iceBtn.addEventListener('click', function () { //ice 버튼 누르면 가격 증가, ice아이콘 보임

        if (!isIce) {
          isIce = true;
          iceIcon.style.display = 'inline';
          hotIcon.style.display = 'none';
          price += 500;
        } else {
          alert(' 이미 선택 되었습니다');
        }

        coffeePrice.innerHTML = price;
      });
      hotBtn.addEventListener('click', function () { //hot 버튼 누르면 가격 증가, hot아이콘 보임

        if (isIce) {
          isIce = false;
          iceIcon.style.display = 'none';
          hotIcon.style.display = 'inline';
          price += -500;
        } else {
          alert('이미 선택 되었습니다');
          hotIcon.style.display = 'inline';
        }
        coffeePrice.innerHTML = price;
      });

      syrupBtn.addEventListener('click', function () { //시럽 버튼 누르면 가격 증가, 시럽 아이콘 보임, 시럽수량 증가
        const syrupCtnShow = document.querySelector('#Osyrup');
        const syrupQy = document.querySelector('#syrupQy');

        if (syrupCnt < 0) {
          syrupCtnShow.style.display = 'none';
        } else {
          syrupCtnShow.style.display = 'inline';
          syrupQy.innerHTML = syrupCnt;
        }

        price += 500;
        syrupCnt += 1;
        coffeePrice.innerHTML = price;
      });

      shotBtn.addEventListener('click', function () { //샷 버튼 누르면 가격 증가, 샷 아이콘 보임 , 샷수량 증가
        const shotCtnShow = document.querySelector('#Oshot');
        const shotQy = document.querySelector('#shotQy');

        if (shotCtn < 0) {
          shotCtnShow.style.display = 'none';
        } else {
          shotCtnShow.style.display = 'inline';
          shotQy.innerHTML = shotCtn;
        }
        price += 500;
        shotCtn += 1;
        coffeePrice.innerHTML = price;
      });
}