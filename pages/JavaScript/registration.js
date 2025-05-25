//Обработка ссылки "Регистрация"
document.querySelector('.register-link').addEventListener('click', function (event) {
  event.preventDefault(); // отменяем стандартное поведение ссылки
  window.location.href = 'registration.html'; // переходим на страницу регистрации
});