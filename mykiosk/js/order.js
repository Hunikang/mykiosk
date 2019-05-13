var orderList = [] // 주문이 담기는 배열 선언
var g_coffee; // 커피 json 저장하는 변수


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




function loadJson(callback) { //에이젝스

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'CoffeeData.json', true);

  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      callback(xhr.response);
    }
  }
  xhr.send();
}


function initProduct() { //상품목록 업데이트
  const productLength = document.querySelectorAll('.coffeeMenu'); //coffeeMenu 총 길이
  const coffeeImgBox = "<img class='coffeeImg'src='#'>" // 커피이미지
  const coffeeNameBox = "<span class='coffeeName'></span>"; // 커피이름
  const coffeePriceBox = "<span class='coffeePrice'><span>원</span></span>"; //커피가격

  for (let i = 0; i < productLength.length; i++) {
    productLength[i].insertAdjacentHTML('beforeend', coffeeImgBox); //이미지
    productLength[i].insertAdjacentHTML('beforeend', coffeeNameBox); // 이름
    productLength[i].insertAdjacentHTML('beforeend', coffeePriceBox) // 가격
  }

  const coffeeImg = document.querySelectorAll('.coffeeImg');
  const coffeeName = document.querySelectorAll('.coffeeName');
  const coffeePrice = document.querySelectorAll('.coffeePrice');


  loadJson(function (data) {
    g_coffee = JSON.parse(data);
    let cnt = 0;

    for (let i in g_coffee) { // (이미지주소 , 이름 , 가격 가져오기 ) ( coffeeMenu 의 아이디를 CoffeeData의 name 키값으로함)
      coffeeImg[cnt].src = g_coffee[i].img;
      coffeeName[cnt].innerHTML = g_coffee[i].name;
      coffeePrice[cnt].innerHTML = g_coffee[i].price;
      productLength[cnt].id = i;
      cnt++;

    }


  });


}
initProduct();


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
BtnEvent();




const menuOn = { // 상품 옵션 창 
  menuOpen: '',

  Ajax: function (callback) { // 메뉴 오픈 AJAX 함수
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'menuSelecter.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        callback(xhr.response);
      }
    }
    xhr.send();
  },

  createMenu: function (coffeeId) { //메뉴생성함수
    menuOn.Ajax(function (data) {

      const coffeeOptionData = `<div id="coffeeOption"></div>`;
      const mainWrap = document.querySelector('#mainWrap');

      mainWrap.insertAdjacentHTML('afterbegin', coffeeOptionData) // #mainWrap 최상위에 #coffeeOption 를 만듬
      const coffeeOption = document.querySelector('#coffeeOption'); // 상품 옵션 창이 들어갈 부모 Element
      coffeeOption.insertAdjacentHTML('beforeend', data); //menuSelecter.html 을 #coffeeOption 에추가

      menu(); //창 등장 애니매이션
      name(coffeeId); //상품처리 
      name.isIce = false; // ice or hot 에 대한 기본값
      close(); // 창닫기
      cancelAll(); //모두취소
    });

    function menu() { //
      menuOpen = document.querySelector('#menuSelecterWrap');
      menuOpen.style.transform = 'transition: all 1s;';

    }

    function name(coffeeId) {

      const coffeeName = document.querySelector('#menuSelecterCoffeeName'); //커피 이름을 출력하는곳
      const coffeeImg = document.querySelector('#menuSelecterCoffeeImg');
      const coffeePrice = document.querySelector('#alertPrice');
      const iceBtn = document.querySelector('#iceBtn');
      const hotBtn = document.querySelector('#hotBtn');
      const shotBtn = document.querySelector('#shotBtn');
      const syrupBtn = document.querySelector('#syrupBtn');
      const iceIcon = document.querySelector('#Oice');
      const hotIcon = document.querySelector('#Ohot');
      const priceDefalut = g_coffee[coffeeId].price;
      let price = priceDefalut;
      let isIce = false;
      let syrupCnt = 1;
      let shotCtn = 1;

      coffeePrice.innerHTML = price;
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



      coffeeImg.src = g_coffee[coffeeId].img;
      coffeeName.innerHTML = g_coffee[coffeeId].name; // g_coffee에 key는 coffee(커피넘버) 의 name 을 출력 

      const menuAdd = document.querySelector('#menuAdd');
      menuAdd.addEventListener('click', function () { //메뉴추가함수
        var tmp = { //상품정보를 정렬후
          'name': g_coffee[coffeeId].name,
          'img': g_coffee[coffeeId].img,
          'price': price,
          'option': {
            'hot': !isIce,
            'ice': isIce,
            'syrup': syrupCnt,
            'shot': shotCtn,
          }
        }
        orderList.push(tmp); //orderList 에 대입
        coffeeOption.remove(); // 창닫기
        CoffeeQy(); // 전체주문수량 출력하는 함수

      });

    }

    function close() { // 창닫기 함수
      var closeBtn = document.querySelector('#closeBtn'); //닫기버튼 누르면 창 닫힘
      closeBtn.addEventListener('click', function () {

        if (coffeeOption) {
          coffeeOption.remove(); //coffeeOption 창을 완전삭제함
        }

      });
    }

    function cancelAll() { //모든 상품 삭제
      const cancelBtn = document.querySelector('#cancelBtn');
      cancelBtn.addEventListener('click', function () {
        for (let i = 0; i < orderList.length; i++) {
          orderList.pop();
        }
       
      });

    }


  },
  Btn: function () { // 어느 커피 눌렀는지 알려주는 함수
    const coffeeBtn = document.querySelectorAll('.coffeeMenu');
    for (let i = 0; i < coffeeBtn.length; i++) {
      coffeeBtn[i].addEventListener('click', function (e) {
        if (!e.target.id) {
          const coffeeId = e.target.parentElement.id;
          menuOn.createMenu(coffeeId);
        } else {
          const coffeeId = e.target.id;
          menuOn.createMenu(coffeeId);
        }


      });
    }
  },



}
menuOn.Btn();


function CoffeeQy(del) { // 전체주문수량 출력하는 함수
  const EA = document.querySelector('#EA');
  if (del) {
    EA.innerHTML = orderList.length;
  } else {
    EA.innerHTML = orderList.length;
  }
}



function CoffeeCart() { //장바구니 on off
  const cartBtn = document.querySelector('#cartBtn');
  const CoffeeCart = document.querySelector('#CoffeeCart');
//   const CoffeeCartBot = document.querySelector('#CoffeeCartBot');
//   const CoffeeCartTop = document.querySelector('#CoffeeCartTop');
//   const body = document.getElementsByName('body');
  let set = false; // on off 상태 ck




  cartBtn.addEventListener('click', function (e) { // 장바구니 애니매이션
    if (set) {
      set = false;
      CoffeeCart.style.left = '900px';
      cartOrderClear(); // 장바구니 off 시 상품표시 clear 해준다 



    } else {
      set = true;
      CoffeeCart.style.left = '700px';
      CartSetting(); // 가격출력함수 호출
      cartOrder(); // 장바구니 기능 호출 하는 함수 호출

    }
  });


}
CoffeeCart();


function CartSetting() { // 장바구니에서 가격출력 하는 함수
  let priceEnd = 0;
  for (let i = 0; i < orderList.length; i++) { // orderList에서 가격만 뽑아서 합침
    priceEnd += orderList[i].price;
  }

  CoffeeCartBot.innerHTML = '총' + priceEnd + '원';
}

function cartOrder() { // 장바구니 기능 호출하는 함수
  creBTn(); // 장바구니 상품목록 생성하는 함수 호출
  delbTn(); // 개별삭제 버튼 함수



}

function creBTn() {// 장바구니 상품목록 생성하는 함수 

  const coffeeList = document.querySelector('#coffeeList');

  const li = `<li class="myOrderList">
        <img class='myOrderListImg' src='#'>
        <div class="orderCancelBtn" >누르면삭제</div>
    </li>`

  for (let i = 0; i < orderList.length; i++) {
    coffeeList.insertAdjacentHTML('beforeend', li);
    const coffeeOrderImg = document.querySelectorAll('.myOrderListImg');
    const orderCancelBtn = document.querySelectorAll('.orderCancelBtn');
    coffeeOrderImg[i].src = orderList[i].img;
    orderCancelBtn[i].id = orderList[i].name;
    console.log('생성!');

  }
}

function delbTn() {// 개별삭제 버튼 함수
  const orderCancelBtn = document.querySelectorAll('.orderCancelBtn');
  const myOrderList = document.querySelectorAll('.myOrderList');

  for (let i = 0; i < orderCancelBtn.length; i++) {
    orderCancelBtn[i].addEventListener('click', function (e) {

      var target = e.target.id;
      for (let u = 0; u < orderList.length; u++) {
        if (orderList[u].name == target) {
          console.log('찾음' + i + orderList[u].name);
          // myOrderList[u].remove();
          orderList.splice(u, 1);
          console.log('삭제완료');
          console.log(orderList);
          cartOrderClear();
          cartOrder();
          CartSetting();
          CoffeeQy();
          break;


        } else {
          console.log('못찾음');
        }
      }

    });
  }
}

function cartOrderClear() { //장바구니 닫을떄 주문상품List 모두제거
  console.log('cartOrderClear');
  const myOrderList = document.querySelectorAll('.myOrderList');
  for (let i = 0; i < myOrderList.length; i++) {
    myOrderList[i].remove();
  }
}