document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const container = document.querySelector(".slider-container");
  let currentIndex = 0;

  function showSlide(index) {
    const offset = -index * 100; // в процентах
    container.style.transform = `translateX(${offset}%)`;
  }

  document.querySelector('.slider').addEventListener('wheel', (event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      // прокрутка вниз — следующий слайд
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    } else {
      // прокрутка вверх — предыдущий слайд
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    }
    showSlide(currentIndex);
  }, { passive: false });

  showSlide(currentIndex); // показываем первый слайд при загрузке
});
