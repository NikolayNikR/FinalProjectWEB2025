const menu = document.querySelector('.menu');
const hide = document.querySelector('.menu_hide');
const grid = document.querySelector('.grid');

hide.addEventListener('click', function() {
    menu.classList.toggle('hiden');
    grid.classList.toggle('hiden');
})