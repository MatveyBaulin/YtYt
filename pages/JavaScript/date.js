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