function loadMenuSelecter(callback) { //에이젝스

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'menuSelecter.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            callback(xhr.response);
        }else{
        }
    }
    xhr.send();
}

function loadMenuSelecterInit(coffee) { //에이젝스호출
    
    loadMenuSelecter(function (data) {
       var htmldata = data;
       var tmp = document.querySelector('#coffeeOption');
       tmp.insertAdjacentHTML('beforeend',htmldata);

       var menuOpen=document.querySelector('#menuSelecterWrap');
       menuOpen.style.transform='transition: all 1s;';
       menuOpen.style.transform='scale(1)';
       
       var coffeeName = document.querySelector('#menuSelecterCoffeeName'); //커피 이름을 출력하는곳
       coffeeName.innerHTML=g_coffee[coffee].name; // g_coffee에 key는 coffee(커피넘버) 의 name 을 출력 
     
       
      
       var closeBtn = document.querySelector('#closeBtn'); //닫기버튼 누르면 창 닫힘
       closeBtn.addEventListener('click', function () {
       
           if(menuOpen){ // #test의 자식인 .menuSelecterWrap를 제거하는 방식
            tmp.removeChild(menuOpen);
           }
       });
      
       
    });
   
}

var coffeeBtn = document.querySelectorAll('.coffeeMenu');

var id;
for(var i=0; i<coffeeBtn.length; i ++){
    coffeeBtn[i].addEventListener('click',function(e){
            
        if(!e.target.id){
             id = e.target.parentElement.id;
        }else{
             id = e.target.id;
        }
        
        loadMenuSelecterInit(id);
     
                 
    });
    
}
