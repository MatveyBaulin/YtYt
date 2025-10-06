document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('registration-form');

            form.addEventListener('submit', function (event) {
                event.preventDefault(); // Предотвратить отправку формы

                // Получаем значения всех полей
                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : ''; // Получаем значение выбранного radiobutton
                const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(checkbox => checkbox.value); // Получаем массив выбранных checkbox
                const country = document.getElementById('country').value;

                // --- Примеры использования RegExp и String методов ---

                // 1. RegExp.test() - Проверка соответствия строки регулярному выражению
                const usernameRegex = /^[a-zA-Z0-9_]+$/;
                const isUsernameValid = usernameRegex.test(username);
                console.log(`Username "${username}" is valid: ${isUsernameValid}`);

                // 2. RegExp.exec() - Поиск первого соответствия в строке
                const emailRegex = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})$/;
                const emailMatch = emailRegex.exec(email);
                if (emailMatch) {
                    console.log("Email local part:", emailMatch[1]); // Имя пользователя перед @
                    console.log("Email domain:", emailMatch[2]);   // Домен
                    console.log("Email TLD:", emailMatch[3]);      // TLD (.com, .net, etc.)
                }

                // 3. String.search() - Поиск позиции соответствия регулярному выражению
                const passwordHasNumber = password.search(/[0-9]/);
                console.log(`Password has a number: ${passwordHasNumber >= 0}`);

                // 4. String.replace() - Замена подстроки, соответствующей регулярному выражению
                const safeUsername = username.replace(/_/g, '-'); // Заменяем _ на -
                console.log(`Safe username: ${safeUsername}`);

                // 5. String.split() - Разбиение строки на массив подстрок
                const skillList = skills.join(', ');
                const skillArray = skillList.split(', ');  // Разбиваем строку навыков на массив
                console.log("Skill array:", skillArray);

                // 6. String.match() - Поиск всех соответствий регулярному выражению
                const text = "HTML CSS JavaScript";
                const matches = text.match(/[A-Z]+/g); // Находим все последовательности заглавных букв
                console.log("Matches:", matches);

                // Формируем строку с данными для вывода
                let message = `
                    Имя пользователя: ${username}
                    Email: ${email}
                    Пароль: ${password}
                    Пол: ${gender ? gender : 'Не указан'}
                    Навыки: ${skills.length > 0 ? skills.join(', ') : 'Нет'}
                    Страна: ${country}

                    ---
                    Результаты проверок (см. консоль)
                `;

                // Выводим данные в диалоговое окно (alert)
                alert(message);
            });
        });
