// Создание слайдера
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".slider-prev");
  const nextButton = document.querySelector(".slider-next");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
    const slideWidth = slides[currentIndex].clientWidth;
    const offset = -currentIndex * slideWidth;
    document.querySelector(".slider-container").style.transform = `translateX(${offset}px)`;
  }

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    showSlide(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    showSlide(currentIndex);
  });

  showSlide(currentIndex); // Показать первый слайд при загрузке
});