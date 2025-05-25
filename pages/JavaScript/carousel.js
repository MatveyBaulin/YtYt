//Управление каруселью
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.advantage');
const total = items.length;
const itemWidth = document.querySelector('.advantage').offsetWidth + 20; // ширина элемента + margin по бокам (10px слева и справа)
let currentIndex = 0;

document.querySelector('.carousel-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel();
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + total) % total;
  updateCarousel();
});

function updateCarousel() {
  const offset = -currentIndex * itemWidth;
  carousel.style.transform = `translateX(${offset}px)`;
}