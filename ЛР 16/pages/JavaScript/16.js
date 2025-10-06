// Базовый класс игры
class BaseGame {
    constructor(диапазон = 100) {
        this.диапазон = диапазон;
        this.числоДляУгадывания = this.сгенерироватьСлучайноеЧисло();
        this.попытки = 0;
        this.максимальныеПопытки = this.calculateMaxAttempts();
        this.играЗакончена = false;

        this.guessInput = document.getElementById("guessInput");
        this.guessButton = document.getElementById("guessButton");
        this.feedback = document.getElementById("feedback");
        this.gameInfo = document.getElementById("gameInfo");
        this.rangeDisplay = document.getElementById("range");
        this.restartButton = document.getElementById("restartButton");

        this.guessButton.addEventListener("click", () => this.проверитьПредположение());
        this.restartButton.addEventListener("click", () => this.перезапуститьИгру());

        this.rangeDisplay.textContent = диапазон;
        this.обновитьИнформацияОбИгре();
    }

    сгенерироватьСлучайноеЧисло() {
        return Math.floor(Math.random() * this.диапазон) + 1;
    }

    calculateMaxAttempts() {
        return Math.ceil(Math.log2(this.диапазон)) + 1;
    }

    проверитьПредположение() {
        if (this.играЗакончена) {
            this.displayFeedback("Игра уже закончена.");
            return;
        }

        const предположение = parseInt(this.guessInput.value);

        if (isNaN(предположение) || предположение < 1 || предположение > this.диапазон) {
            this.displayFeedback("Пожалуйста, введите целое число от 1 до " + this.диапазон + ".");
            return;
        }

        this.попытки++;

        if (предположение === this.числоДляУгадывания) {
            this.handleCorrectGuess();
        } else if (предположение < this.числоДляУгадывания) {
            this.handleIncorrectGuess(false);
        } else {
            this.handleIncorrectGuess(true);
        }

        this.обновитьИнформацияОбИгре();
        this.guessInput.value = "";
    }

    перезапуститьИгру() {
        this.числоДляУгадывания = this.сгенерироватьСлучайноеЧисло();
        this.попытки = 0;
        this.играЗакончена = false;
        this.feedback.textContent = "";
        this.guessButton.disabled = false;
        this.обновитьИнформацияОбИгре();
        this.guessInput.value = "";
        this.gameInfo.textContent = "";
    }

    обновитьИнформацияОбИгре() {
        this.gameInfo.textContent = `Попыток использовано: ${this.попытки}. Максимальное количество попыток: ${this.максимальныеПопытки}.`;
    }


    displayFeedback(message) {
        this.feedback.textContent = message;
    }


    handleCorrectGuess() {
        this.играЗакончена = true;
        this.displayFeedback(`Поздравляем! Вы угадали число ${this.числоДляУгадывания} за ${this.попытки} попыток.`);
        this.guessButton.disabled = true;
        this.gameInfo.textContent = "";
    }

    handleIncorrectGuess(isHigh) {
        if (this.попытки >= this.максимальныеПопытки) {
            this.играЗакончена = true;
            this.displayFeedback(`Вы проиграли. Число для угадывания было ${this.числоДляУгадывания}. Было доступно только ${this.максимальныеПопытки} попыток.`);
            this.guessButton.disabled = true;
            this.gameInfo.textContent = "";
        } else {
            const tooHighLow = isHigh ? "Слишком много" : "Слишком мало";
            this.displayFeedback(`${tooHighLow}. Попыток осталось: ${this.максимальныеПопытки - this.попытки}.`);
        }
    }
}

// Класс, представляющий игру с подсказками (наследуется от BaseGame)
class HintGame extends BaseGame {
    constructor(диапазон = 100) {
        super(диапазон);
        this.hintButton = document.createElement("button");
        this.hintButton.textContent = "Подсказка";
        this.hintButton.id = "hintButton";
        this.container = document.querySelector(".container");
        this.container.appendChild(this.hintButton);
        this.hintButton.addEventListener("click", () => this.getHint());
        this.подсказкиИспользованы = 0;
        this.максимумПодсказок = 2; // Ограничим количество подсказок
        this.обновитьИнформацияОбИгре();
    }


    calculateMaxAttempts() {
        return super.calculateMaxAttempts() + 2; //Увеличим кол-во попыток, чтобы было честно
    }

    getHint() {
        if (this.подсказкиИспользованы < this.максимумПодсказок) {
            this.подсказкиИспользованы++;
            const delta = Math.floor(this.диапазон / (this.максимумПодсказок + 1)); // Уменьшаем диапазон для каждой подсказки
            const нижняяГраница = Math.max(1, this.числоДляУгадывания - delta);
            const верхняяГраница = Math.min(this.диапазон, this.числоДляУгадывания + delta);
            this.displayFeedback(`Число находится между ${нижняяГраница} и ${верхняяГраница}. Подсказок осталось: ${this.максимумПодсказок - this.подсказкиИспользованы}`);
            this.обновитьИнформацияОбИгре(); // Обновляем информацию об игре
        } else {
            this.displayFeedback("Больше подсказок нет.");
            this.hintButton.disabled = true; // Отключаем кнопку подсказки
        }
    }
    обновитьИнформацияОбИгре() {
        super.обновитьИнформацияОбИгре();
        this.gameInfo.textContent += `. Подсказок использовано: ${this.подсказкиИспользованы} / ${this.максимумПодсказок}.`;
    }

    перезапуститьИгру() {
        super.перезапуститьИгру();
        this.подсказкиИспользованы = 0;
        this.hintButton.disabled = false;
        this.обновитьИнформацияОбИгре();
    }
}

// Класс игры, где диапазон выбирается пользователем (наследуется от BaseGame)
class CustomRangeGame extends BaseGame {
    constructor() {
        const диапазон = parseInt(prompt("Введите желаемый диапазон (максимальное число):", "100")) || 100;
        super(диапазон);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // const game = new BaseGame(); //  Игра с фиксированным диапазоном
    const hintGame = new HintGame(); // Игра с подсказками
    //const customRangeGame = new CustomRangeGame(); // Игра с настраиваемым диапазоном
});

