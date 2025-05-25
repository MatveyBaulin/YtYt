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