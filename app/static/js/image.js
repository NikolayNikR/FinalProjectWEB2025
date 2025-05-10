let currentIndex = 0;
const slides = document.querySelectorAll('.slide')
const totalSlides = slides.length;
const intervalTime = 3000;

function showSlide(index) {
    slides.forEach((slide, i ) =>{
        if (i == index){
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

function prevSlide(){
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

let autoPlay = setInterval(nextSlide, intervalTime);

document.querySelector('.next-btn').addEventListener('click', () =>{
    clearInterval(autoPlay);
    prevSlide();
    autoPlay = setInterval(nextSlide, intervalTime);
});

document.querySelector('.prev-btn').addEventListener('click', () =>{
    clearInterval(autoPlay);
    prevSlide();
    autoPlay = setInterval(nextSlide, intervalTime);
});

document.querySelector('carousel-container').addEventListener('mouseenter', () =>{
    clearInterval(autoPlay);
});

document.querySelector('carousel-container').addEventListener('mouseenter', () =>{
    autoPlay = setInterval(nextSlide, intervalTime);
});