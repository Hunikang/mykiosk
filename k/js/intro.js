function introHide(){
    const img = document.querySelector('#introImg');
    img.style.opacity=0.1;
    
   
}

function introShow(){
    const img = document.querySelector('#introImg');
    img.style.opacity=1;
    
}

setInterval(function(){
    setTimeout(function(){
        introHide();
        setTimeout(function(){
            introShow();
        },1000);
    },0);
},2000);

setTimeout(function(){
    location.href="takeout.html";
},7000);
