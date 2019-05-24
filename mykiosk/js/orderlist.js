/*
 * author : kang jihoon
 * email : snowleopard902@gmail.com
 *
 *
 */


var orderList = [] // 주문이 담기는 배열 선언
var g_coffee; // 커피 json 저장하는 변수
var g_drink; // 음료 저장하는 변수
var g_dessert; // 디저트 저장


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

    prevBtn.style.transform = "scale(0.9)";  // 클릭하면 작아졌다가 0.1초뒤 다시커짐
    setTimeout(function () {
      prevBtn.style.transform = "scale(1)";
    }, 100);

  });
  NextBtn.addEventListener('click', function () {

    NextBtn.style.transform = "scale(0.9)"; // 클릭하면 작아졌다가 0.1초뒤 다시커짐
    setTimeout(function () {
      NextBtn.style.transform = "scale(1)";
    }, 100);

  });

}
BtnEvent();
function initAllProduct(jsonSrc) { // 상품데이터 불러오기

  function loadJson(callback) { //에이젝스

    var xhr = new XMLHttpRequest();
    xhr.open('GET', jsonSrc, true);

    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        callback(xhr.response, xhr.responseURL);


      }
    }
    xhr.send();
  }

  loadJson(function (data, url) { // 불러온 데이터가 어떤 데이터인지 확인

    if (url.indexOf('CoffeeData.json') != -1) { //데이터 검증후 json 을 객체로 만든뒤 해당 변수에 저장
      g_coffee = JSON.parse(data);
      console.log('커피데이터 등록 완료');


    } else if (url.indexOf('dessert.json') != -1) {
      g_dessert = JSON.parse(data);
      console.log('디저트등록완료');


    } else if (url.indexOf('drinkData.json') != -1) {
      g_drink = JSON.parse(data);
      console.log('음료등록완료');


    } else {
      console.log('잘못된 접근 입니다');
    }

  });


}
initAllProduct('CoffeeData.json');
initAllProduct('dessert.json');
initAllProduct('drinkData.json');

window.onload = function () { //페이지 로드가 전부 완료되면 
  defalutProductInit(); //상품목록 불러오는 함수
  paymentCardOpen.onClick(); //카드결제 버튼이벤트
  paymentCashOpen.onClick(); //현금결제 버튼 이벤트
}




function defalutProductInit() { //상품목록 업데이트

  const productLength = document.querySelectorAll('.coffeeMenu'); //coffeeMenu 총 길이
  const coffeeImgBox = "<img class='coffeeImg'src='#'>" // 커피이미지
  const coffeeNameBox = "<span class='coffeeName'></span>"; // 커피이름
  const coffeePriceBox = "<span class='coffeePrice'><span>원</span></span>"; //커피가격
  const coffeeBtn = document.querySelector('#coffeeBtn'); //커피로 메뉴 바꾸는 버튼
  const dessertBtn = document.querySelector('#dessertBtn');//디저트로 메뉴 바꾸는 버튼
  const drinkBtn = document.querySelector('#drinkBtn');//음료로 메뉴 바꾸는 버튼

  for (let i = 0; i < productLength.length; i++) { //coffeeMenu Div 만큼 반복문을 돌아서 템플릿을 입력
    productLength[i].insertAdjacentHTML('beforeend', coffeeImgBox); //이미지
    productLength[i].insertAdjacentHTML('beforeend', coffeeNameBox); // 이름
    productLength[i].insertAdjacentHTML('beforeend', coffeePriceBox); // 가격
  }

  const coffeeImg = document.querySelectorAll('.coffeeImg'); //상품이미지 출력
  const coffeeName = document.querySelectorAll('.coffeeName'); //상품이름 출력
  const coffeePrice = document.querySelectorAll('.coffeePrice'); //상품가격출력

  coffeeBtnOn(); //초기메뉴는 커피라서 커피버튼on시킨 상태로 만들기위해 함수호출
  mainBtnColor(2); //메뉴 색상 하이라이트 하는 함수

  coffeeBtn.addEventListener('click', function () {
    coffeeBtnOn();
    mainBtnColor(2);
  });
  dessertBtn.addEventListener('click', function () {
    dessertBtnOn();
    mainBtnColor(1);
  });
  drinkBtn.addEventListener('click', function () {
    drinkBtnOn();
    mainBtnColor(3);
  });

  function mainBtnColor(btn) {//메뉴 색상 하이라이트 하는 함수 
    const dessertBtn = document.querySelector('.dessertBtn');
    const coffeeBtn = document.querySelector('.coffeeBtn');
    const drinkBtn = document.querySelector('.drinkBtn');


    dessertBtn.style.color = '#ffffff';
    coffeeBtn.style.color = '#ffffff';
    drinkBtn.style.color = '#ffffff';

    switch (btn) {
      case 1:
        dessertBtn.style.color = 'tomato';
        break;
      case 2:
        coffeeBtn.style.color = 'tomato';
        break;
      case 3:
        drinkBtn.style.color = 'tomato';
        break;
      default:
        dessertBtn.style.color = '#ffffff';
        coffeeBtn.style.color = '#ffffff';
        drinkBtn.style.color = '#ffffff';
        break;
    }
  }

  // 클릭시 해당하는 메뉴로 이미지,이름,가격을 바꿔주는 함수
  function coffeeBtnOn() {

    let cnt = 0;

    for (let i in g_coffee) {

      coffeeImg[cnt].src = g_coffee[i].img;
      coffeeName[cnt].innerHTML = g_coffee[i].name;
      coffeePrice[cnt].innerHTML = g_coffee[i].price + ' 원';
      productLength[cnt].id = i;
      cnt++;

    }
  }

  function dessertBtnOn() {

    let cnt = 0;

    for (let i in g_dessert) {

      coffeeImg[cnt].src = g_dessert[i].img;
      coffeeName[cnt].innerHTML = g_dessert[i].name;
      coffeePrice[cnt].innerHTML = g_dessert[i].price + ' 원';;
      productLength[cnt].id = i;
      cnt++;

    }
  }

  function drinkBtnOn() {

    let cnt = 0;

    for (let i in g_drink) {

      coffeeImg[cnt].src = g_drink[i].img;
      coffeeName[cnt].innerHTML = g_drink[i].name;
      coffeePrice[cnt].innerHTML = g_drink[i].price + ' 원';;
      productLength[cnt].id = i;
      cnt++;

    }
  }

}



menuOn();
function menuOn() {
  Btn();
}

function Btn() { // 어느 커피 눌렀는지 알려주는 함수
  const coffeeBtn = document.querySelectorAll('.coffeeMenu');
  for (let i = 0; i < coffeeBtn.length; i++) { //상품길이만큼 반복문을 돌며 클릭이벤트를 건다 

    coffeeBtn[i].addEventListener('click', function (e) { //상품을 클릭하면 세부메뉴 창을 연다

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

function createMenu(coffeeId) { // 상품상세창을 ajax 로 불러옴
  function Ajax(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'menuSelecter.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        callback(xhr.response);
      }
    }
    xhr.send();
  };

  Ajax(function (data) {
    const productOptionData = `<div id="coffeeOption"></div>`;
    const mainWrap = document.querySelector('#mainWrap');

    mainWrap.insertAdjacentHTML('afterbegin', productOptionData);
    const coffeeOption = document.querySelector('#coffeeOption');
    coffeeOption.insertAdjacentHTML('beforeend', data);
    MenuProcess(coffeeId);
    //상품상세창의 mainWrap 에 첫번째 자식으로 coffeeOption div 를 만들고
    //coffeeOption 에 ajax 로 불러온 html 을 넣는다.
    //해당 상품에 맞는 데이터를 불러오기위해 MenuProcess 를 호출
  });



};

function MenuProcess(coffeeId) {
  const coffeeName = document.querySelector('#menuSelecterCoffeeName'); //커피 이름을 출력하는곳
  const coffeeImg = document.querySelector('#menuSelecterCoffeeImg');
  const coffeePrice = document.querySelector('#alertPrice');
  const iceBtn = document.querySelector('#iceBtn');
  const hotBtn = document.querySelector('#hotBtn');
  const shotBtn = document.querySelector('#shotBtn');
  const syrupBtn = document.querySelector('#syrupBtn');
  const iceIcon = document.querySelector('#Oice');
  const hotIcon = document.querySelector('#Ohot');
  const menuSelecter = document.querySelector('#menuSelecter');

  const menuSelecterSubscript = document.querySelector('#menuSelecterSubscript'); //상품설병
  let priceDefalut; //추가옵션이 없을때 기본가격
  let syrupCnt = 1;
  let shotCtn = 1;
  let isIce = false;

  if (coffeeId.indexOf('coffee') == 0) {
    // whatChoice = 1;

    console.log(' 커피아이디 입니다.' + coffeeId);
    coffeePrice.innerHTML = g_coffee[coffeeId].price;
    coffeeImg.src = g_coffee[coffeeId].img;
    coffeeName.innerHTML = g_coffee[coffeeId].name;
    priceDefalut = g_coffee[coffeeId].price;
    menuSelecterSubscript.innerHTML = g_coffee[coffeeId].lyrics;


  } else if (coffeeId.indexOf('drink') == 0) {
    // whatChoice = 2;
    console.log(' 드링크아이디 입니다.' + coffeeId);
    coffeePrice.innerHTML = g_drink[coffeeId].price;
    coffeeImg.src = g_drink[coffeeId].img;
    coffeeName.innerHTML = g_drink[coffeeId].name;
    priceDefalut = g_drink[coffeeId].price;
    menuSelecterSubscript.innerHTML = g_drink[coffeeId].lyrics;
    iceIcon.style.display='none';
    hotIcon.style.display='none';
    iceBtn.style.display='none';
    hotBtn.style.display='none';
    shotBtn.style.display='none';
    syrupBtn.style.display='none';
    menuSelecter.innerHTML='<div id="noMoreOp"> 선택 가능한 옵션이 없습니다 !</div>';


  } else if (coffeeId.indexOf('dessert') == 0) {
    // whatChoice = 3;
    console.log(' 디저트아이디 입니다.' + coffeeId);
    coffeePrice.innerHTML = g_dessert[coffeeId].price;
    coffeeImg.src = g_dessert[coffeeId].img;
    coffeeName.innerHTML = g_dessert[coffeeId].name;
    priceDefalut = g_dessert[coffeeId].price;
    menuSelecterSubscript.innerHTML = g_dessert[coffeeId].lyrics;
    iceIcon.style.display='none';
    hotIcon.style.display='none';
    iceBtn.style.display='none';
    hotBtn.style.display='none';
    shotBtn.style.display='none';
    syrupBtn.style.display='none';
    menuSelecter.innerHTML='<div id="noMoreOp"> 선택 가능한 옵션이 없습니다 !</div>';

  } else {
    console.log(' 잘못 된 접근입니다.');
  }



  iceBtn.addEventListener('click', function () { //ice 버튼 누르면 가격 증가, ice아이콘 보임

    if (!isIce) {
      isIce = true;
      iceIcon.style.display = 'inline';
      hotIcon.style.display = 'none';
      priceDefalut += 500;
    } else {
      alert(' 이미 선택 되었습니다');
    }

    coffeePrice.innerHTML = priceDefalut;
  });
  hotBtn.addEventListener('click', function () { //hot 버튼 누르면 가격 증가, hot아이콘 보임

    if (isIce) {
      isIce = false;
      iceIcon.style.display = 'none';
      hotIcon.style.display = 'inline';
      priceDefalut += -500;
    } else {
      alert('이미 선택 되었습니다');
      hotIcon.style.display = 'inline';
    }
    coffeePrice.innerHTML = priceDefalut;
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

    priceDefalut += 500;
    syrupCnt += 1;
    coffeePrice.innerHTML = priceDefalut;
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
    priceDefalut += 500;
    shotCtn += 1;
    coffeePrice.innerHTML = priceDefalut;
  });

  function menuPlus() {
    const menuAdd = document.querySelector('#menuAdd');

    menuAdd.addEventListener('click', function () {
      var info = {
        'name': coffeeName.innerHTML,
        'img': coffeeImg.src,
        'price': priceDefalut,
        'option': {
          'hot': !isIce,
          'ice': isIce,
          'syrup': syrupCnt,
          'shot': shotCtn,
        }
      }
      orderList.push(info);
      coffeeOption.remove();
      coffeeQy();
      alert(" 상품이 추가되었습니다 !");
    });
  }
  menuPlus();
  close();
  cancelAll();
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
    coffeeQy();
  });

}
function coffeeQy(del) { // 전체주문수량 출력하는 함수
  const EA = document.querySelector('#EA');
  if (del) {
    EA.innerHTML = orderList.length;
  } else {
    EA.innerHTML = orderList.length;
  }
}

function CoffeeCart() { //장바구니 on off
  const cartBtn = document.querySelector('#cartBtn');
  const cartBtn2 = document.querySelector('#cartBtn2');
  const CoffeeCart = document.querySelector('#CoffeeCart');
  const CoffeeCartTop = document.querySelector('#CoffeeCartTop');
  //   const CoffeeCartBot = document.querySelector('#CoffeeCartBot');
  //   const CoffeeCartTop = document.querySelector('#CoffeeCartTop');
  //   const body = document.getElementsByName('body');
  let set = false; // on off 상태 ck

  cartBtn.addEventListener('click', function (e) { // 장바구니 선언부
    cartOn();
  });

  function cartOn() { // on off 함수
    if (set) {
      set = false;
      CoffeeCart.style.left = '900px';
      CoffeeCart.style.boxShadow = '0';
      cartOrderClear(); // 장바구니 off 시 상품표시 clear 해준다 
      console.log(' 닫힘 !');

    } else {
      set = true;
      console.log(' 열림 !');
      // CoffeeCart.style.boxShadow='0px 1px 5px black';

      CoffeeCart.style.left = '700px';
      CartSetting(); // 가격출력함수 호출
      cartOrder(); // 장바구니 기능 호출 하는 함수 호출
    }
  }

  function isClickElse() { // 다른곳 클릭했을때 off 함수
    window.addEventListener('click', function (e) {
      if (e.target != cartBtn && e.target != cartBtn2 && !e.target.classList.contains('dontclose')) {
        console.log('다른곳눌러서닫힘')
        set = false;
        CoffeeCart.style.left = '900px';
        cartOrderClear(); // 장바구니 off 시 상품표시 clear 해준다 
      } else {
        console.log('조아 ok ');
      }
    });
  }

  isClickElse();
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

function creBTn() { // 장바구니 상품목록 생성하는 함수 

  const coffeeList = document.querySelector('#coffeeList');

  const li = `<li class="myOrderList dontclose">
        <img class='myOrderListImg dontclose' src='#'> 
        <div class="orderCancelBtn dontclose" ></div>
        <span class='myOrderListSub dontclose'></span>
    </li>`;

  for (let i = 0; i < orderList.length; i++) {
    coffeeList.insertAdjacentHTML('beforeend', li);
    const coffeeOrderImg = document.querySelectorAll('.myOrderListImg'); //커피이미지
    const orderCancelBtn = document.querySelectorAll('.orderCancelBtn'); //지우기버튼
    const myOrderListSub = document.querySelectorAll('.myOrderListSub'); //커피이름
    myOrderListSub[i].innerHTML = orderList[i].name;
    coffeeOrderImg[i].src = orderList[i].img;
    orderCancelBtn[i].id = orderList[i].name; // 지우기버튼을 눌렀을떄 주문목록에서 커피이름을 지우기위한 변수
    console.log('생성!');

  }
}

function delbTn() { // 개별삭제 버튼 함수
  const orderCancelBtn = document.querySelectorAll('.orderCancelBtn');
  // const myOrderList = document.querySelectorAll('.myOrderList');

  for (let i = 0; i < orderCancelBtn.length; i++) {
    orderCancelBtn[i].addEventListener('click', function (e) { //버튼 수 만큼 이벤트를 건다

      var target = e.target.id; //버튼 아이디 
      for (let u = 0; u < orderList.length; u++) { //주문갯수 반큼 반복문 돌려서 지울타겟이 되는 상품의 이름을 찾는다
        if (orderList[u].name == target) { // 버튼아이디(커피이름) 이 주문리스트의 커피이름과 같으면 실행
          console.log('찾음' + i + orderList[u].name);
          // myOrderList[u].remove();
          orderList.splice(u, 1);
          console.log('삭제완료');
          console.log(orderList);
          cartOrderClear(); //장바구니 삭제
          cartOrder(); //장바구니 생성
          CartSetting(); // 장바구니 가격출력
          coffeeQy(); // 총 주문갯수 업데이트 
          break; // 커피종류가 중복되는 경우 break가 없으면 모두 삭제되기 때문에 break 를 걸어준다.


        } else {
          console.log('못찾음');
        }
      }

    });
  }
}

function cartOrderClear() { //장바구니 닫을떄 주문상품List 모두제거 ( 이 함수가 없으면 없어지지 않고 계속 추가됨)
  console.log('cartOrderClear');
  const myOrderList = document.querySelectorAll('.myOrderList');
  for (let i = 0; i < myOrderList.length; i++) {
    myOrderList[i].remove();
  }
}






const paymentCardOpen = {
  cardBtn: document.querySelector('#cardBtn'),
  paymentCard: document.querySelector('#paymentCard'),
  confirmPrice: document.querySelector('#confirmPrice'),
  isCardOpen: true,


  Ajax: function (callback) { // 메뉴 오픈 AJAX 함수
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'paymentOnCard.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        callback(xhr.response);
      }
    }
    xhr.send();
  },
  createMenu: function () {
    if(document.querySelector('#paymentCashWrap')){ // 현금결제창이 열려있을시 닫음
      paymentCashOpen.removeOn();
      paymentCashOpen.isCashOpen = true;
    }
    paymentCardOpen.Ajax(function (data) {
      let priceEnd = 0;
      paymentCard.insertAdjacentHTML('beforeend', data);

      console.log('createMenu 생성됨');
      paymentCardOpen.isCardOpen = false;
      paymentCardOpen.offClick();
      paymentCardOpen.submit();
      if (orderList.length > 0) {
        for (let i = 0; i < orderList.length; i++) {
          priceEnd += orderList[i].price;
          console.log(priceEnd);
          confirmPrice.innerHTML = '총' + priceEnd + '원 입니다.';

        }
      } else {
        confirmPrice.innerHTML = '주문이 0 개 입니다';
      }

    });

  },
  onClick: function () {
    this.cardBtn.addEventListener('click', function () {

      if (paymentCardOpen.isCardOpen) {
        paymentCardOpen.createMenu();
        console.log('페이먼트카드 생성됨');
      }


    });
  },
  offClick: function () {
    const homeIcon = document.querySelector('#homeIcon');

    homeIcon.addEventListener('click', function () {
      if (!paymentCardOpen.isCardOpen) {
        console.log('paymentWrap삭제!');
        paymentCardOpen.removeOn();
        paymentCardOpen.isCardOpen = true;
      } else {
        console.log('paymentWrap 삭제실패!');
      }
    });

  },
  removeOn: function () {
    const paymentWrap = document.querySelector('#paymentCardWrap');
    paymentWrap.remove();
  },
  submit: function () {
    const submitBTn = document.querySelector('#submit');
    submitBTn.addEventListener('click', function () {
      if (!paymentCardOpen.isCardOpen && (!orderList.length == 0)) {
        paymentDone.createDone('#paymentCardWrap');
        paymentCardOpen.isCardOpen = true;
      } else {
        alert(' 주문내역이 없습니다 ');
      }
    });
  }
};



const paymentCashOpen = {
  cashBtn: document.querySelector('#cashBtn'),
  paymentCash: document.querySelector('#paymentcash'),
  // confirmPrice2:document.querySelector('#CashConfirmPrice'),
  isCashOpen: true,


  Ajax: function (callback) { // 메뉴 오픈 AJAX 함수
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'paymentOnCash.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        callback(xhr.response);
      }
    }
    xhr.send();
  },
  createMenu: function () {
    if(document.querySelector('#paymentCardWrap')){ //카드 결제창이 열려있을시 닫힘
      paymentCardOpen.removeOn();
      paymentCardOpen.isCardOpen = true;
    }
    paymentCashOpen.Ajax(function (data) {
      let priceEnd = 0;
      paymentCash.insertAdjacentHTML('beforeend', data);
      var confirmPrice2 = document.querySelector('#CashConfirmPrice');
      // console.log('paymentOnCash 생성됨');
      paymentCashOpen.isCashOpen = false;
      paymentCashOpen.offClick();
      paymentCashOpen.submit();
      if (orderList.length > 0) {
        for (let i = 0; i < orderList.length; i++) {
          priceEnd += orderList[i].price;
          console.log(priceEnd);
          confirmPrice2.innerHTML = `총 가격은 ${priceEnd} 입니다.`;
        }
      } else {
        confirmPrice2.innerHTML = `주문내역이 0 개 입니다.`;
      }

    });

  },
  onClick: function () {
    this.cashBtn.addEventListener('click', function () {
      if (paymentCashOpen.isCashOpen) {
        paymentCashOpen.createMenu('paymentCardWrap');

        console.log('페이먼트캐시 생성됨');

      }


    });
  },
  offClick: function () {
    const homeIcon = document.querySelector('#homeIcon');

    homeIcon.addEventListener('click', function () {
      if (!paymentCashOpen.isCashOpen) {
        console.log('paymentWrap삭제!');
        paymentCashOpen.removeOn();
        paymentCashOpen.isCashOpen = true;
      } else {
        console.log('paymentWrap 삭제실패!');
      }
    });

  },
  removeOn: function () {
    const paymentCashWrap = document.querySelector('#paymentCashWrap');
    paymentCashWrap.remove();
  },
  submit: function () {
    const submitBTn = document.querySelector('#Cashsubmit');
    submitBTn.addEventListener('click', function () {
      if (!paymentCashOpen.isCashOpen && (!orderList.length == 0)) {
        paymentDone.createDone('#paymentCashWrap');
        paymentCashOpen.isCashOpen = true;
      } else {
        alert(' 주문내역이 없습니다 ');
      }
    });
  }
};



paymentDone = {
  Ajax: function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'paymentdone.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        callback(xhr.response);
      }
    }
    xhr.send();
  },
  createDone: function (id) {
    this.Ajax(function (data) {
      // alert(id);
      const abc = document.querySelector(id);
      abc.remove();
      const paymentDoneWrap = document.querySelector('#paymentDone');
      paymentDoneWrap.insertAdjacentHTML('beforeend', data);
      console.log(' 결제완료창 on');
      paymentCashOpen.isCashOpen = false;
      paymentCardOpen.isCardOpen = false;
    });
  }
};



function system(){
  const systemBtn = document.querySelector('#systemBtn');
  const adminWindow = document.querySelector('#adminWindow');
  let isOpen = false;
  systemBtn.addEventListener('click',function(){
    if(!isOpen){
      adminWindow.style.top='0%';
      isOpen = true;
      adminOrderList();
    }else{
      adminWindow.style.top='-100%';
      isOpen = false;
      adminOrderListClear();
    }
  });
}
system();


function adminOrderList(){
  const orderlistUl = document.querySelector('#orderlistUl');
  const template = `<li class="orderListli">
    <span class="orderSub">1</span>
    <span class="orderOp1">2</span>
    <span class="orderOp2">3</span>
    <span class="orderOp3">4</span>
    <span class="orderPrice">5</span>
  </li>`;
  for(let i = 0; i<orderList.length; i++){
    orderlistUl.insertAdjacentHTML('beforeend',template);
    const orderSub = document.querySelectorAll('.orderSub');
    const orderOp1 = document.querySelectorAll('.orderOp1');
    const orderOp2 = document.querySelectorAll('.orderOp2');
    const orderOp3 = document.querySelectorAll('.orderOp3');
    const orderPrice = document.querySelectorAll('.orderPrice');
    const isHot = function(){
      if(orderList[i].option["hot"]){
        return 'HOT';
      }else{
        return 'ICE';
      }
    };
    orderSub[i].innerHTML = orderList[i].name;
    orderOp1[i].innerHTML = isHot();
    orderOp2[i].innerHTML = '시럽추가: ' + orderList[i].option["syrup"] + '번';
    orderOp3[i].innerHTML = '샷추가: ' + orderList[i].option["shot"] + '번';
    orderPrice[i].innerHTML = orderList[i].price + '원';
    
  }
}

function adminOrderListClear(){
  const orderListli = document.querySelectorAll('.orderListli');
  for(let i=0; i<orderList.length; i++){
    orderListli[i].remove();
  }
}