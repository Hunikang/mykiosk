const tBtn = document.querySelector('#takeoutBtn');
const eBtn = document.querySelector('#EatBtn');

function click() {
    tBtn.addEventListener('click', function () {
        localStorage.setItem('takeout', true);
        location.href = './oderlist.html';
    });
    eBtn.addEventListener('click', function () {
        localStorage.setItem('takeout', false);
        location.href = './oderlist.html';
    });
}
click();