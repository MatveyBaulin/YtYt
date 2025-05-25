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
