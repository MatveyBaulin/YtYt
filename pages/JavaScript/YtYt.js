// Вывод сообщения при входе на сайт
window.onload = function () {
  alert("Добро пожаловать на сайт <<Школа программирования>>!");
};
// Меню-гамбургер
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // Опционально: закрывать меню при клике вне его
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('show');
    }
  });
});

// Получение элемента, куда будет выводиться дата
const dateElement = document.getElementById('date');

// Получение текущей даты
const today = new Date();

// Форматирование даты (например, dd.mm.yyyy)
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы нумеруются с 0
const year = today.getFullYear();

const formattedDate = `${day}.${month}.${year}`;

// Вывод даты на страницу
dateElement.textContent = formattedDate;

// Создаем кнопку
const btn = document.createElement('button');
btn.textContent = 'Вниз';

// Стили для кнопки (можно изменить по желанию)
btn.style.position = 'fixed';
btn.style.bottom = '20px';
btn.style.right = '20px';
btn.style.padding = '10px 15px';
btn.style.fontSize = '14px';
btn.style.zIndex = '1000';
btn.style.cursor = 'pointer';

// Добавляем кнопку на страницу
document.body.appendChild(btn);

// Функция для определения, внизу ли страница
function isAtBottom() {
  return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1;
  // "-1" для учета возможных погрешностей
}

// Обработчик клика
btn.addEventListener('click', () => {
  if (isAtBottom()) {
    // Если внизу, то прокрутить наверх
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    // Если не внизу, то прокрутить вниз
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
});

// Обновляем текст кнопки в зависимости от положения
function updateButtonText() {
  if (isAtBottom()) {
    btn.textContent = 'Наверх';
  } else {
    btn.textContent = 'Вниз';
  }
}

// Обновляем текст при прокрутке
window.addEventListener('scroll', updateButtonText);

// Изначально устанавливаем правильный текст
updateButtonText();

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

// Изменение цвета кнопки
document.addEventListener('DOMContentLoaded', function () {
  const testButton = document.querySelector('.test-button');

  testButton.addEventListener('mousedown', function () {
    this.classList.add('active'); // добавляем класс при нажатии
  });

  testButton.addEventListener('mouseup', function () {
    this.classList.remove('active'); // удаляем класс при отпускании
  });

  testButton.addEventListener('mouseleave', function () {
    this.classList.remove('active'); // удаляем класс, если мышь покинула кнопку
  });
});

// Увеличение логотипа в подвале
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.footer-logo');

  logo.addEventListener('mouseenter', () => {
    logo.classList.add('enlarged');
  });

  logo.addEventListener('mouseleave', () => {
    logo.classList.remove('enlarged');
  });
});

//Обработка ссылки "Регистрация"
document.querySelector('.register-link').addEventListener('click', function (event) {
  event.preventDefault(); // отменяем стандартное поведение ссылки
  window.location.href = 'registration.html'; // переходим на страницу регистрации
});

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