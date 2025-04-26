const wallPaper = document.querySelectorAll('.photo');
const darkWall = document.querySelector('.fixDiv')

console.log(wallPaper)

wallPaper.forEach(item =>{
    item.addEventListener('click', function() {
    item.classList.toggle('showWallPaper');
    darkWall.classList.toggle('drkWall');
   });
})

