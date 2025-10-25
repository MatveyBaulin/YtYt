document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const getCookiesButton = document.getElementById('get-cookies');
    const clearCookiesButton = document.getElementById('clear-cookies');
    const getLocalStorageButton = document.getElementById('get-local-storage');
    const clearLocalStorageButton = document.getElementById('clear-local-storage');

    // Функция для установки cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Функция для получения cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Функция для удаления cookie
    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // Функция для валидации формы
    function validateForm() {
        let isValid = true;

        // Очищаем сообщения об ошибках
        document.querySelectorAll('.error').forEach(error => error.textContent = '');

        // Проверка имени пользователя
        const username = document.getElementById('username').value;
        if (!username) {
            document.getElementById('username-error').textContent = 'Пожалуйста, введите имя пользователя.';
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            document.getElementById('username-error').textContent = 'Только латинские буквы, цифры и символ "_".';
            isValid = false;
        }

        // Проверка email
        const email = document.getElementById('email').value;
        if (!email) {
            document.getElementById('email-error').textContent = 'Пожалуйста, введите email.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            document.getElementById('email-error').textContent = 'Пожалуйста, введите правильный email.';
            isValid = false;
        }

        // Проверка пароля
        const password = document.getElementById('password').value;
        if (!password) {
            document.getElementById('password-error').textContent = 'Пожалуйста, введите пароль.';
            isValid = false;
        } else if (!/(?=.*[0-9])(?=.*[a-zA-Z]).{8,}/.test(password)) {
            document.getElementById('password-error').textContent = 'Не менее 8 символов, минимум одна цифра и одна буква.';
            isValid = false;
        }

        // Проверка пола
        if (!document.querySelector('input[name="gender"]:checked')) {
            document.getElementById('gender-error').textContent = 'Пожалуйста, выберите пол.';
            isValid = false;
        }

        // Проверка навыков
        const skills = document.querySelectorAll('input[name="skills"]:checked');
        if (skills.length === 0) {
            document.getElementById('skills-error').textContent = 'Выберите хотя бы один навык.';
            isValid = false;
        }

        // Проверка страны
        const country = document.getElementById('country').value;
        if (!country) {
            document.getElementById('country-error').textContent = 'Пожалуйста, выберите страну.';
            isValid = false;
        }

        return isValid;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Отменяем стандартную отправку формы

        if (validateForm()) {
            // Получаем значения всех полей
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value; // Внимание: НИКОГДА не храните пароль в localStorage или cookie в открытом виде!
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(checkbox => checkbox.value);
            const country = document.getElementById('country').value;

            // Сохраняем данные в cookie
            setCookie('username', username, 7);
            setCookie('email', email, 7);
            // setCookie('password', password, 7); // Никогда не храните пароль в cookie!
            setCookie('gender', gender, 7);
            setCookie('skills', JSON.stringify(skills), 7);
            setCookie('country', country, 7);

            // Сохраняем данные в Local Storage
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            // localStorage.setItem('password', password); // Никогда не храните пароль в localStorage!
            localStorage.setItem('gender', gender);
            localStorage.setItem('skills', JSON.stringify(skills));
            localStorage.setItem('country', country);

            alert('Данные сохранены в cookie и Local Storage!');
        }
    });

    getCookiesButton.addEventListener('click', function () {
        const username = getCookie('username');
        const email = getCookie('email');
        const gender = getCookie('gender');
        const skills = getCookie('skills');  // Получаем JSON-строку
        const country = getCookie('country');

        let skillsArray = []; // Переменная для хранения массива навыков

        // Проверяем, есть ли skills в cookie
        if (skills) {
            try {
                skillsArray = JSON.parse(skills); // Преобразуем JSON-строку в массив
            } catch (e) {
                console.error("Ошибка при парсинге skills из cookie:", e);
                skillsArray = []; // Если произошла ошибка, устанавливаем пустой массив
            }
        }
        let message = `Данные из cookie:\n`;
        message += `Имя пользователя: ${username || 'Не указано'}\n`;
        message += `Email: ${email || 'Не указано'}\n`;
        message += `Пол: ${gender || 'Не указано'}\n`;

        if (skillsArray && skillsArray.length > 0) {
            message += `Навыки: ${skillsArray.join(', ')}\n`;
        } else {
            message += `Навыки: Не указано\n`;
        }

        message += `Страна: ${country || 'Не указано'}\n`;

        alert(message);
    });

    clearCookiesButton.addEventListener('click', function () {
        eraseCookie('username');
        eraseCookie('email');
        eraseCookie('password');
        eraseCookie('gender');
        eraseCookie('skills');
        eraseCookie('country');

        alert('Cookie очищены!');
    });

    getLocalStorageButton.addEventListener('click', function () {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const gender = localStorage.getItem('gender');
        const skills = localStorage.getItem('skills');
        const country = localStorage.getItem('country');

        let skillsArray = [];

        if (skills) {
            try {
                skillsArray = JSON.parse(skills);
            } catch (e) {
                console.error("Ошибка при парсинге skills из localStorage:", e);
                skillsArray = [];
            }
        }

        let message = `Данные из Local Storage:\n`;
        message += `Имя пользователя: ${username || 'Не указано'}\n`;
        message += `Email: ${email || 'Не указано'}\n`;
        message += `Пол: ${gender || 'Не указано'}\n`;

        if (skillsArray && skillsArray.length > 0) {
            message += `Навыки: ${skillsArray.join(', ')}\n`;
        } else {
            message += `Навыки: Не указано\n`;
        }

        message += `Страна: ${country || 'Не указано'}\n`;

        alert(message);
    });

    clearLocalStorageButton.addEventListener('click', function () {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('gender');
        localStorage.removeItem('skills');
        localStorage.removeItem('country');

        alert('Local Storage очищен!');
    });
});
