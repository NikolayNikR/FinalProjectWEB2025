const menu = document.querySelector('.menu');
const hide = document.querySelector('.menu_hide');
const veshi = document.querySelector('.main-content');

hide.addEventListener('click', function() {
    menu.classList.toggle('hiden');
    veshi.classList.toggle('hidden-new');
});